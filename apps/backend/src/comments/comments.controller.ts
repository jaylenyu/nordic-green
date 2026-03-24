import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpsertCommentDto } from './comments.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findByProduct(@Query('productId', ParseIntPipe) productId: number) {
    return this.commentsService.findByProduct(productId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  upsert(@Request() req: any, @Body() dto: UpsertCommentDto) {
    return this.commentsService.upsert(req.user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(req.user.id, id);
  }
}
