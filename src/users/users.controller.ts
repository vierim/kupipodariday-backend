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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  find(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateOne(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findWishes() {
    //console.log('Get users/me/wishes');
    return 'users/me/wishes';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findUser(@Param('username') username: string) {
    //console.log(`Get users/:username - ${username}`);
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findUserWishes() {
    //console.log('Get users/{username}/wishes');
    return 'users/{username}/wishes';
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  findOne(@Body('query') query: string) {
    //console.log('Post users/find');
    return this.usersService.findOne(query);
  }
}
