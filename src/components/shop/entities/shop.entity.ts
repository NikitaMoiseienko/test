import { Item } from 'src/components/item/entities/item.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Shop {
  @ManyToMany(() => Item, (item) => item.shops)
  items: Item[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  adress: string;

  @Column()
  phone: string;

  @Column()
  workTime: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: false })
  delivery: boolean;
}
