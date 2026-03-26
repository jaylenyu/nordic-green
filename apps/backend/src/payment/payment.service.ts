import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfirmPaymentDto, CancelPaymentDto } from './payment.dto';
import { GRADE_THRESHOLDS, POINTS_RATE } from '../common/constants';

const TOSS_API_URL = 'https://api.tosspayments.com/v1/payments';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  private get tossSecretKey() {
    return process.env.TOSS_SECRET_KEY ?? '';
  }

  private tossAuthHeader() {
    const encoded = Buffer.from(`${this.tossSecretKey}:`).toString('base64');
    return { Authorization: `Basic ${encoded}`, 'Content-Type': 'application/json' };
  }

  /** 토스 결제 승인 */
  async confirm(userId: string, dto: ConfirmPaymentDto) {
    const orderId = parseInt(dto.orderId, 10);
    if (isNaN(orderId)) throw new BadRequestException('올바르지 않은 orderId 형식입니다.');

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });
    if (!order || order.userId !== userId) throw new NotFoundException('주문을 찾을 수 없습니다.');

    // 토스 결제 승인 API 호출
    const tossRes = await fetch(`${TOSS_API_URL}/confirm`, {
      method: 'POST',
      headers: this.tossAuthHeader(),
      body: JSON.stringify({
        paymentKey: dto.paymentKey,
        orderId: dto.orderId,
        amount: dto.amount,
      }),
    });

    const tossData = await tossRes.json();

    if (!tossRes.ok) {
      throw new InternalServerErrorException(
        tossData.message ?? '토스페이먼츠 결제 승인에 실패했습니다.',
      );
    }

    // DB 트랜잭션: Payment 생성 + Order 상태 업데이트 + 포인트/등급 처리
    const earnedPoints = Math.floor(dto.amount * POINTS_RATE);

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.payment.create({
          data: {
            orderId,
            userId,
            paymentKey: dto.paymentKey,
            orderName: tossData.orderName ?? `주문 #${orderId}`,
            method: tossData.method,
            amount: dto.amount,
            status: tossData.status ?? 'DONE',
            requestedAt: tossData.requestedAt ? new Date(tossData.requestedAt) : null,
            approvedAt: tossData.approvedAt ? new Date(tossData.approvedAt) : new Date(),
          },
        });

      await tx.order.update({
        where: { id: orderId },
        data: { status: 2 }, // 결제완료
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          points: { increment: earnedPoints },
          totalSpent: { increment: dto.amount },
        },
      });

      await tx.pointHistory.create({
        data: {
          userId,
          orderId,
          amount: earnedPoints,
          reason: 'purchase',
        },
      });

      // 등급 재계산
      const updatedUser = await tx.user.findUnique({
        where: { id: userId },
        select: { totalSpent: true },
      });
      const newGrade = this.calcGrade(updatedUser?.totalSpent ?? 0);
      await tx.user.update({ where: { id: userId }, data: { grade: newGrade } });
    });
    } catch (err: any) {
      // Prisma unique constraint violation (P2002) — 이중 결제 요청
      if (err?.code === 'P2002') {
        throw new BadRequestException('이미 결제된 주문입니다.');
      }
      throw err;
    }

    return { message: '결제가 완료되었습니다.', earnedPoints };
  }

  /** 결제 취소/환불 */
  async cancel(userId: string, orderId: number, dto: CancelPaymentDto) {
    const payment = await this.prisma.payment.findUnique({ where: { orderId } });
    if (!payment || payment.userId !== userId) {
      throw new NotFoundException('결제 정보를 찾을 수 없습니다.');
    }
    if (payment.status !== 'DONE') {
      throw new BadRequestException('취소 가능한 결제가 아닙니다.');
    }

    if (dto.cancelAmount && dto.cancelAmount > payment.amount) {
      throw new BadRequestException('환불 금액이 원결제 금액을 초과할 수 없습니다.');
    }

    const body: Record<string, unknown> = { cancelReason: dto.cancelReason };
    if (dto.cancelAmount) body.cancelAmount = dto.cancelAmount;

    const tossRes = await fetch(`${TOSS_API_URL}/${payment.paymentKey}/cancel`, {
      method: 'POST',
      headers: this.tossAuthHeader(),
      body: JSON.stringify(body),
    });

    const tossData = await tossRes.json();
    if (!tossRes.ok) {
      throw new InternalServerErrorException(tossData.message ?? '결제 취소에 실패했습니다.');
    }

    const canceledAmount = dto.cancelAmount ?? payment.amount;
    const deductPoints = Math.floor(canceledAmount * POINTS_RATE);

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'CANCELED', cancelReason: dto.cancelReason },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { status: 6 }, // 주문취소
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          points: { decrement: deductPoints },
          totalSpent: { decrement: canceledAmount },
        },
      });

      await tx.pointHistory.create({
        data: { userId, orderId, amount: -deductPoints, reason: 'cancel' },
      });

      const updatedUser = await tx.user.findUnique({
        where: { id: userId },
        select: { totalSpent: true },
      });
      const newGrade = this.calcGrade(updatedUser?.totalSpent ?? 0);
      await tx.user.update({ where: { id: userId }, data: { grade: newGrade } });
    });

    return { message: '결제가 취소되었습니다.' };
  }

  /** 주문별 결제 정보 조회 */
  async findByOrder(userId: string, orderId: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
      include: { order: { include: { orderItems: { include: { product: true } } } } },
    });
    if (!payment || payment.userId !== userId) {
      throw new NotFoundException('결제 정보를 찾을 수 없습니다.');
    }
    return payment;
  }

  /** 토스 웹훅 수신 (가상계좌 입금 등) */
  async handleWebhook(payload: Record<string, unknown>) {
    const { paymentKey, status, orderId } = payload as {
      paymentKey: string;
      status: string;
      orderId: string;
    };

    if (!paymentKey || !status) return { received: true };

    const payment = await this.prisma.payment.findUnique({ where: { paymentKey } });
    if (!payment) return { received: true };

    await this.prisma.payment.update({
      where: { paymentKey },
      data: { status },
    });

    // 가상계좌 입금 완료 시 주문 상태 업데이트
    if (status === 'DONE') {
      const earnedPoints = Math.floor(payment.amount * POINTS_RATE);
      await this.prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: payment.orderId },
          data: { status: 2 },
        });
        await tx.user.update({
          where: { id: payment.userId },
          data: {
            points: { increment: earnedPoints },
            totalSpent: { increment: payment.amount },
          },
        });
        await tx.pointHistory.create({
          data: { userId: payment.userId, amount: earnedPoints, reason: 'purchase' },
        });
      });
    }

    return { received: true };
  }

  private calcGrade(totalSpent: number): number {
    if (totalSpent >= GRADE_THRESHOLDS[3]) return 3;
    if (totalSpent >= GRADE_THRESHOLDS[2]) return 2;
    if (totalSpent >= GRADE_THRESHOLDS[1]) return 1;
    return 0;
  }
}
