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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    const user = req.user;

    return this.usersService.findOne(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateOne(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findWishes() {
    return 'users/me/wishes';
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
  findOne(@Body('query') query: string) {
    return this.usersService.findOne(query);
  }
}
