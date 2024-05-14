import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
// import { CreateShopDto } from './dto/create-shop.dto';
// import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create() {
    return this.shopService.create();
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Post('/queue')
  shopQueue(@Body('data') data: number) {
    return this.shopService.addQueue(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.shopService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
