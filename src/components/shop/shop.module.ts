import { forwardRef, Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ItemModule } from '../item/item.module';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [TypeOrmModule.forFeature([Shop]), forwardRef(() => ItemModule)],
  exports: [ShopService],
})
export class ShopModule {}
