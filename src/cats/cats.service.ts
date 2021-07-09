import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private usersRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Cat> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
