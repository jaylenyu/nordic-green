import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, IssueTokenDto, EmailSignUpDto, EmailLoginDto } from './auth.dto';

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

  @Post('signup/email')
  emailSignUp(@Body() dto: EmailSignUpDto) {
    return this.authService.emailSignUp(dto);
  }

  @Post('login/email')
  @HttpCode(HttpStatus.OK)
  emailLogin(@Body() dto: EmailLoginDto) {
    return this.authService.emailLogin(dto);
  }

  /** JWT stateless 로그아웃 — 클라이언트 측 토큰 삭제 책임 */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return { message: '로그아웃되었습니다.' };
  }
}
