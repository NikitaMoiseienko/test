import { Item } from 'src/components/item/entities/item.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shop {
  @ManyToMany(() => Item, (item) => item.shops)
  @JoinTable({
    name: 'shop_items',
  })
  items: Item[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  workTime: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: false })
  delivery: boolean;
}
