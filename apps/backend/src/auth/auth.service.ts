import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import {
  SignUpDto,
  IssueTokenDto,
  EmailSignUpDto,
  EmailLoginDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      return { message: 'User already exists', user: existing };
    }

    const user = await this.prisma.user.create({
      data: { email: dto.email, name: dto.name, image: dto.image },
      select: { id: true, email: true, name: true, grade: true, points: true },
    });

    return { message: 'User created', user };
  }

  /** Exchange a NextAuth userId for a short-lived NestJS JWT */
  async issueToken(dto: IssueTokenDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new UnauthorizedException('User not found');

    return { accessToken: this.signToken(user.id, user.email ?? '') };
  }

  async emailSignUp(dto: EmailSignUpDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('이미 사용 중인 이메일입니다.');

    const hashed = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashed,
        phone: dto.phone,
      },
      select: { id: true, email: true, name: true, grade: true, points: true },
    });

    return { accessToken: this.signToken(user.id, user.email ?? ''), user };
  }

  async emailLogin(dto: EmailLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );

    const { password: _, ...safeUser } = user;
    return {
      accessToken: this.signToken(user.id, user.email ?? ''),
      user: safeUser,
    };
  }

  private signToken(userId: string, email: string) {
    return this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: (process.env.JWT_EXPIRES_IN ?? '24h') as any },
    );
  }
}
