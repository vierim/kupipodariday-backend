import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';

import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class User {
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

  @Column({
    type: 'varchar',
    unique: true,
    length: 30,
  })
  @Length(2, 30)
  username: string; // username — имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string; // about — информация о пользователе, строка от 2 до 200 символов. В качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string; // avatar — ссылка на аватар. В качестве значения по умолчанию задайте https://i.pravatar.cc/300

  @Column({
    unique: true,
  })
  email: string; // email — адрес электронной почты пользователя, должен быть уникален.

  @Column()
  password: string; // password — пароль пользователя, строка.

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[]; // wishes — список желаемых подарков. Используйте для него соответствующий тип связи.

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[]; // offers — содержит список подарков, на которые скидывается пользователь. Установите для него подходящий тип связи.

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[]; // wishlists - содержит список вишлистов, которые создал пользователь. Установите для него подходящий тип связи.
}
