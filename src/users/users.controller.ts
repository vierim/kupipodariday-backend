import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req): Promise<User> {
    return this.usersService.findOne(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateOne(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findWishes(@Request() req) {
    return this.usersService.findUserWishes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findUserWishes() {
    return 'users/{username}/wishes';
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  findMany(@Body('query') query: string) {
    return this.usersService.findMany(query);
  }
}
