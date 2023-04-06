import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { UserAlreadyExistsException } from './exceptions';
import { UserAlreadyExistsExceptionFilter } from '../middlewares/user-exist.filter';

import type { TSigninResponse, TUserResponse } from '../types/responses';

@Controller()
@UseFilters(UserAlreadyExistsExceptionFilter)
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() payload: CreateUserDto): Promise<TUserResponse> {
    const { username, email } = payload;

    if (
      (await this.userService.findByEmail(email)) ||
      (await this.userService.findOne(username))
    ) {
      throw new UserAlreadyExistsException();
    }

    return await this.userService.create(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req): Promise<TSigninResponse> {
    return this.authService.signin(req.user);
  }
}
