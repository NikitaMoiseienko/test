import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get(':shopId/items')
  allProductsInShop(@Param('shopId') shopId: string) {
    return this.shopService.allProductsInShop(+shopId);
  }

  @Post(':shopId/items')
  addItemsToShop(
    @Param('shopId') shopId: string,
    @Body() body: { items: number[] },
  ) {
    console.log(shopId, body.items);
    return this.shopService.addItemsToShop(+shopId, body.items);
  }

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Delete(':shopId')
  removeItemsFromShop(
    @Param('shopId') shopId: string,
    @Body() body: { items: number[] },
  ) {
    return this.shopService.removeItemsFromShop(+shopId, body.items);
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
