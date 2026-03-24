import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class IssueTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
