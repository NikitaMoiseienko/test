import { Shop } from 'src/components/shop/entities/shop.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column({ default: false })
  isPreviouslyUsed: boolean;

  @Column({ enum: ['black', 'white', 'pink', 'red'], nullable: true })
  color: string;

  @ManyToMany(() => Shop, (shop) => shop.items)
  shops: Shop[];
}
