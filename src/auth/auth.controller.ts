import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);

    return user;
    // return this.authService.auth(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
