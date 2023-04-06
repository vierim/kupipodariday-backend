import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { User } from '../users/entities/user.entity';
import type { TSigninResponse } from '../types/responses';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<User> | null {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch ? user : null;
  }

  async signin(user: User): Promise<TSigninResponse> {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
