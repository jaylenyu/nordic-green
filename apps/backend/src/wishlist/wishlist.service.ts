import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleWishlistDto } from './wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  /** Returns just the product IDs in the user's wishlist */
  async getIds(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: { items: { select: { productId: true } } },
    });
    return { productIds: wishlist?.items.map((i) => i.productId) ?? [] };
  }

  /** Returns full product objects in the user's wishlist */
  async getItems(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: { include: { category: true } } },
        },
      },
    });
    return wishlist?.items.map((i) => i.product) ?? [];
  }

  /** Toggle a product in/out of the wishlist */
  async toggle(userId: string, dto: ToggleWishlistDto) {
    const wishlist = await this.prisma.wishlist.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: { items: { where: { productId: dto.productId } } },
    });

    const exists = wishlist.items.length > 0;

    if (exists) {
      await this.prisma.wishlistItem.delete({
        where: { wishlistId_productId: { wishlistId: wishlist.id, productId: dto.productId } },
      });
      return { action: 'removed', productId: dto.productId };
    } else {
      await this.prisma.wishlistItem.create({
        data: { wishlistId: wishlist.id, productId: dto.productId },
      });
      return { action: 'added', productId: dto.productId };
    }
  }

  /** Clear the entire wishlist */
  async clear(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) return { message: 'Wishlist not found' };

    await this.prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id } });
    return { message: 'Wishlist cleared' };
  }
}
