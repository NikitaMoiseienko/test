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
    console.log(shopId);
    const shop = await this.shopRepository.findOne(shopId, {
      relations: ['items'],
    });
    console.log(shop);
    const { items } = shop;
    console.log(items);
    const result = await this.itemService.getForIds(items.map((i) => i.id));

    return result;
  }
}
