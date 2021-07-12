import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopService } from '../shop/shop.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopsService: ShopService,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemsRepository.save(createItemDto);
  }

  async addItemToManyShops(itemId: number, shopIds?: number[]) {
    const shopsPromise = Array.isArray(shopIds)
      ? this.shopsService.getByIds(shopIds)
      : this.shopsService.findAll();

    const [shops, item] = await Promise.all([
      shopsPromise,
      this.itemsRepository.findOne({ id: itemId }),
    ]);
    shops.forEach((shop) => {
      if (!shop.items) shop.items = [];

      shop.items.push(item);
    });

    return await this.shopsService.saveMany(shops);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOne(id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemsRepository.update({ id }, updateItemDto);
  }

  remove(id: number) {
    return this.itemsRepository.delete(id);
  }
  getForIds(ids: number[]) {
    return this.itemsRepository.findByIds(ids);
  }
}
