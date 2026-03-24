import { IsInt, Min } from 'class-validator';

export class AddCartDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  amount: number;
}

export class UpdateCartDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  amount: number;
}
