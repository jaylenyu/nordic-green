import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ToggleWishlistDto } from './wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getIds(@Request() req: any) {
    return this.wishlistService.getIds(req.user.id);
  }

  @Get('items')
  getItems(@Request() req: any) {
    return this.wishlistService.getItems(req.user.id);
  }

  @Post('toggle')
  toggle(@Request() req: any, @Body() dto: ToggleWishlistDto) {
    return this.wishlistService.toggle(req.user.id, dto);
  }

  @Delete()
  clear(@Request() req: any) {
    return this.wishlistService.clear(req.user.id);
  }
}
