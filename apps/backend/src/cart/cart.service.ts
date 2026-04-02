import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartDto, UpdateCartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: { include: { category: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async add(userId: string, dto: AddCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    return this.prisma.cart.create({
      data: { userId, ...dto },
    });
  }

  async update(userId: string, id: number, dto: UpdateCartDto) {
    const item = await this.prisma.cart.findUnique({ where: { id } });
    if (!item || item.userId !== userId)
      throw new NotFoundException('Cart item not found');

    return this.prisma.cart.update({
      where: { id },
      data: { quantity: dto.quantity, amount: dto.amount },
    });
  }

  async remove(userId: string, id: number) {
    const item = await this.prisma.cart.findUnique({ where: { id } });
    if (!item || item.userId !== userId)
      throw new NotFoundException('Cart item not found');

    return this.prisma.cart.delete({ where: { id } });
  }
}
