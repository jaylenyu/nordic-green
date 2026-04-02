import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProduct(productId: number) {
    return this.prisma.comment.findMany({
      where: {
        orderItem: { productId },
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        orderItem: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });
    if (!comment) throw new NotFoundException(`Comment #${id} not found`);
    return comment;
  }

  async upsert(userId: string, dto: UpsertCommentDto) {
    return this.prisma.comment.upsert({
      where: { orderItemId: dto.orderItemId },
      create: {
        userId,
        orderItemId: dto.orderItemId,
        rate: dto.rate,
        contents: dto.contents,
        images: dto.images,
      },
      update: {
        rate: dto.rate,
        contents: dto.contents,
        images: dto.images,
      },
    });
  }

  async remove(userId: string, id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.userId !== userId)
      throw new NotFoundException('Comment not found');

    return this.prisma.comment.delete({ where: { id } });
  }
}
