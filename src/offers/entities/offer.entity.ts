import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer {
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

  @ManyToOne(() => User, (user) => user.offers)
  user: User; // user содержит id желающего скинуться;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish; // item содержит ссылку на товар;

  @Column()
  amount: number; // amount — сумма заявки, округляется до двух знаков после запятой;

  @Column({
    default: false,
  })
  hidden: boolean; // hidden — флаг, который определяет показывать ли информацию о скидывающемся в списке. По умолчанию равен false.
}
