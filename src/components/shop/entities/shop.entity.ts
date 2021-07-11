import { Item } from 'src/components/item/entities/item.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @ManyToMany(() => Item, (item) => item.shops)
  items: Item[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  workTime: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: false })
  delivery: boolean;
}
