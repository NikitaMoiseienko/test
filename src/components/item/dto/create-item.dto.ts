import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Item } from '../entities/item.entity';

export class CreateItemDto extends PartialType(OmitType(Item, ['id'])) {}
