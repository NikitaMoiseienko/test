import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [forwardRef(() => ShopModule), TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
