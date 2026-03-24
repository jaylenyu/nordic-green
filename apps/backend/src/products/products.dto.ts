import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductsQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  take?: number = 8;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  contains?: string;
}

export class GetProductsCountQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  contains?: string;
}
