import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
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
  findByOrder(@Request() req: any, @Param('orderId', ParseIntPipe) orderId: number) {
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

  /** 토스 웹훅 — 인증 없음 (토스 서버에서 직접 호출) */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  webhook(@Body() payload: Record<string, unknown>) {
    return this.paymentService.handleWebhook(payload);
  }
}
