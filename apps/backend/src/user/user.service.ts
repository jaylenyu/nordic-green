import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './user.dto';
import { GRADE_LABELS, GRADE_THRESHOLDS } from '../common/constants';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        grade: true,
        points: true,
        totalSpent: true,
      },
    });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    const nextGrade = user.grade < 3 ? user.grade + 1 : null;
    const nextThreshold =
      nextGrade !== null ? GRADE_THRESHOLDS[nextGrade] : null;
    const progress =
      nextThreshold !== null
        ? Math.min(
            Math.floor(
              ((user.totalSpent - GRADE_THRESHOLDS[user.grade]) /
                (nextThreshold - GRADE_THRESHOLDS[user.grade])) *
                100,
            ),
            100,
          )
        : 100;

    return {
      ...user,
      gradeLabel: GRADE_LABELS[user.grade],
      nextGradeLabel: nextGrade !== null ? GRADE_LABELS[nextGrade] : null,
      nextGradeThreshold: nextThreshold,
      gradeProgress: progress,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
        ...(dto.image !== undefined && { image: dto.image }),
      },
      select: { id: true, name: true, email: true, image: true, phone: true },
    });
  }

  async getPointHistory(userId: string) {
    return this.prisma.pointHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async getGrade(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { grade: true, totalSpent: true, points: true },
    });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    return {
      grade: user.grade,
      gradeLabel: GRADE_LABELS[user.grade],
      totalSpent: user.totalSpent,
      points: user.points,
      thresholds: GRADE_THRESHOLDS,
      gradeLabels: GRADE_LABELS,
    };
  }
}
