import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);

    return user;
    // return this.authService.auth(user);
  }
}
