import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  Headers,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfirmPaymentDto, CancelPaymentDto } from './payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('confirm')
  @UseGuards(JwtAuthGuard)
  confirm(@Request() req: any, @Body() dto: ConfirmPaymentDto) {
    return this.paymentService.confirm(req.user.id, dto);
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  findByOrder(
    @Request() req: any,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.paymentService.findByOrder(req.user.id, orderId);
  }

  @Post(':orderId/cancel')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  cancel(
    @Request() req: any,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: CancelPaymentDto,
  ) {
    return this.paymentService.cancel(req.user.id, orderId, dto);
  }

  /** 토스 웹훅 — Payment-Secret 헤더로 서명 검증 */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  webhook(
    @Headers('payment-secret') secret: string,
    @Body() payload: Record<string, unknown>,
  ) {
    const webhookSecret = process.env.TOSS_WEBHOOK_SECRET;
    if (webhookSecret && secret !== webhookSecret) {
      throw new UnauthorizedException('웹훅 서명이 유효하지 않습니다.');
    }
    return this.paymentService.handleWebhook(payload);
  }
}
