import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto, UpdateCartDto } from './cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.cartService.findByUser(req.user.id);
  }

  @Post()
  add(@Request() req: any, @Body() dto: AddCartDto) {
    return this.cartService.add(req.user.id, dto);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCartDto,
  ) {
    return this.cartService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(req.user.id, id);
  }
}
