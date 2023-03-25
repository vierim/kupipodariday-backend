import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { User } from 'src/users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.userService.create(createUserDto);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
