import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsQueryDto, GetProductsCountQueryDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findMany(@Query() query: GetProductsQueryDto) {
    return this.productsService.findMany(query);
  }

  @Get('count')
  count(@Query() query: GetProductsCountQueryDto) {
    return this.productsService.count(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
