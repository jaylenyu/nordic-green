import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, IssueTokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      return { message: 'User already exists', user: existing };
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        image: dto.image,
      },
    });

    return { message: 'User created', user };
  }

  /**
   * Exchange a NextAuth userId for a short-lived NestJS JWT.
   * Called by the frontend after Google OAuth succeeds.
   */
  async issueToken(dto: IssueTokenDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '15m' },
    );

    return { accessToken: token };
  }
}
