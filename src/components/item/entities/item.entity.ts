import { Shop } from 'src/components/shop/entities/shop.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  price: number;

  @Column({ default: false })
  isPreviouslyUsed: boolean;

  @Column({ enum: ['black', 'white', 'pink', 'red'] })
  color: string;

  @ManyToMany(() => Shop, (shop) => shop.items)
  shops: Shop[];
}
