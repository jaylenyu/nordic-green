import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetProductsQueryDto, GetProductsCountQueryDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: GetProductsQueryDto) {
    const { skip, take, category, orderBy, contains } = query;

    const where: Prisma.ProductWhereInput = {};
    if (category) {
      where.category = { name: { contains: category, mode: 'insensitive' } };
    }
    if (contains) {
      where.name = { contains, mode: 'insensitive' };
    }

    let orderByClause: Prisma.ProductOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (orderBy === 'price_asc') orderByClause = { price: 'asc' };
    if (orderBy === 'price_desc') orderByClause = { price: 'desc' };
    if (orderBy === 'name_asc') orderByClause = { name: 'asc' };

    const products = await this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy: orderByClause,
      include: { category: true },
    });

    return products;
  }

  async count(query: GetProductsCountQueryDto) {
    const { category, contains } = query;

    const where: Prisma.ProductWhereInput = {};
    if (category) {
      where.category = { name: { contains: category, mode: 'insensitive' } };
    }
    if (contains) {
      where.name = { contains, mode: 'insensitive' };
    }

    const count = await this.prisma.product.count({ where });
    return { count };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }
}
