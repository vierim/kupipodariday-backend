import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private wishesService: WishesService,
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

  async findById(userId: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return user;
  }

  async updateOne(userId: number, updateUserDto: UpdateUserDto) {
    // нужно хешировать пароль, если он приходит в теле запроса. Сейчас при апдейте информации пароль записывается в базу в неизменном виде.

    await this.userRepository.update(userId, updateUserDto);
    const user = await this.userRepository.findOneBy({ id: userId });

    return user;
  }

  async findUserWishes(userId: number) {
    const wishes = await this.wishesService.findMany(userId);

    return wishes;
  }

  async findMany(query: string) {
    const users = await this.userRepository.findBy([
      { username: Like(`%${query}%`) },
      { email: Like(`%${query}%`) },
    ]);

    return users;
  }

  async findByEmail(query: string) {
    return await this.userRepository.findOneBy({ email: query });
  }
}
