import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentKey: string;

  @IsString()
  @IsNotEmpty()
  orderId: string; // 토스는 orderId를 string으로 전달

  @IsInt()
  @Min(1)
  amount: number;
}

export class CancelPaymentDto {
  @IsString()
  @IsNotEmpty()
  cancelReason: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  cancelAmount?: number; // 미입력 시 전액 취소
}
