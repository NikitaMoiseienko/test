import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ItemModule } from './components/item/item.module';
import { ShopModule } from './components/shop/shop.module';
import { Item } from './components/item/entities/item.entity';
import { Shop } from './components/shop/entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'mathew',
      password: 'qwerty',
      database: 'warehouse',
      entities: [Item, Shop],
      synchronize: true,
    }),
    ItemModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
