import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpsertCommentDto {
  @IsInt()
  orderItemId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @IsString()
  @IsOptional()
  contents?: string;

  @IsString()
  @IsOptional()
  images?: string;
}
