import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Request() req: any) {
    return this.userService.getMe(req.user.id);
  }

  @Patch('me')
  updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.id, dto);
  }

  @Get('me/points')
  getPointHistory(@Request() req: any) {
    return this.userService.getPointHistory(req.user.id);
  }

  @Get('me/grade')
  getGrade(@Request() req: any) {
    return this.userService.getGrade(req.user.id);
  }
}
