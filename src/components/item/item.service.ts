import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemsRepository.save(createItemDto);
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
}
