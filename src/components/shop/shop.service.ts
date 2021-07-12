import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemService } from '../item/item.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    private itemService: ItemService,
  ) {}
  create(createShopDto: CreateShopDto) {
    return this.shopRepository.save(createShopDto);
  }

  findAll() {
    return this.shopRepository.find();
  }

  findOne(id: number) {
    return this.shopRepository.findOne(id);
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return this.shopRepository.update({ id }, updateShopDto);
  }

  remove(id: number) {
    return this.shopRepository.delete(id);
  }

  async allProductsInShop(shopId: number) {
    const shop = await this.shopRepository.findOne(shopId, {
      relations: ['items'],
    });

    return shop.items;
  }

  async addItemsToShop(shopId: number, itemIds: number[]) {
    const [shop, items] = await Promise.all([
      this.shopRepository.findOne(shopId, {
        relations: ['items'],
      }),
      this.itemService.getForIds(itemIds),
    ]);

    console.log(shop);
    console.log(items);

    shop.items.push(...items);

    return await this.shopRepository.save(shop);
  }

  async removeItemsFromShop(shopId: number, itemIds: number[]) {
    const shop = await this.shopRepository.findOne(shopId, {
      relations: ['items'],
    });

    shop.items = shop.items.filter((item) => !itemIds.includes(item.id));

    return await this.shopRepository.save(shop);
  }
}
