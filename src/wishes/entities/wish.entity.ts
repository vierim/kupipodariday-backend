import { Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
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
  name: string; // name — название подарка. Не может быть длиннее 250 символов и короче одного.

  @Column()
  link: string; // link — ссылка на интернет-магазин, в котором можно приобрести подарок, строка.

  @Column()
  image: string; // image - ссылка на изображение подарка, строка. Должна быть валидным URL.

  @Column()
  price: number; // price — стоимость подарка, с округлением до сотых, число.

  @Column()
  raised: number; // raised — сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок. Также округляется до сотых.

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User; // owner — ссылка на пользователя, который добавил пожелание подарка.

  @Column()
  @Length(1, 1024)
  description: string; // description — строка с описанием подарка длиной от 1 и до 1024 символов.

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[]; // offers — массив ссылок на заявки скинуться от других пользователей.

  @Column()
  copied: number; // copied — содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число.
}
