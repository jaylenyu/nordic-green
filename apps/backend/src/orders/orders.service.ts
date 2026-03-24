import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: { include: { category: true } },
            comment: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId,
        receiver: dto.receiver,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        orderItems: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
          })),
        },
      },
      include: { orderItems: true },
    });
  }

  async updateStatus(userId: string, orderId: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== userId) throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
    });
  }

  async remove(userId: string, orderId: number) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== userId) throw new NotFoundException('Order not found');

    return this.prisma.order.delete({ where: { id: orderId } });
  }
}
