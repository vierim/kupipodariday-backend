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

import { User } from '../users/entities/user.entity';

import type { TLoginResponse } from '../types/response';

@Controller()
@UseFilters(UserAlreadyExistsExceptionFilter)
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, email } = createUserDto;

    if (
      (await this.userService.findByEmail(email)) ||
      (await this.userService.findOne(username))
    ) {
      throw new UserAlreadyExistsException();
    }

    return await this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req): Promise<TLoginResponse> {
    return this.authService.login(req.user);
  }
}
