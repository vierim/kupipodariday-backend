import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Length } from 'class-validator';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string; // name — название списка.  Не может быть длиннее 250 символов и короче одного;

  @Column({
    type: 'varchar',
    length: 1500,
  })
  description: string; // description — описание подборки, строка до 1500 символов;

  @Column()
  image: string; // image — обложка для подборки;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @Column()
  items: string; // items содержит набор ссылок на подарки.
}
