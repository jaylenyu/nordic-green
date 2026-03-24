import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, IssueTokenDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  issueToken(@Body() dto: IssueTokenDto) {
    return this.authService.issueToken(dto);
  }
}
