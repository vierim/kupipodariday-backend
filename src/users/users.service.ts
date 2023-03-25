import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = createUserDto.username;
    user.about = createUserDto.about;
    user.avatar = createUserDto.avatar;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userRepository.save(user);
  }

  async findOne(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: name,
      },
    });

    return user;
  }

  async updateOne(userId: any, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(userId, updateUserDto);

    return user;
  }
}
