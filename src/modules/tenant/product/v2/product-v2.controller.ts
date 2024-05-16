import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductV2Service } from './product-v2.service';
import { CreateProductV2Dto } from './dto/create-product-v2.dto';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';

@Controller('product')
export class ProductV2Controller {
  constructor(private readonly productV2Service: ProductV2Service) {}

  @Post()
  create(@Body() createProductV2Dto: CreateProductV2Dto) {
    return this.productV2Service.create(createProductV2Dto);
  }

  @Get()
  findAll() {
    return this.productV2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productV2Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductV2Dto: UpdateProductV2Dto,
  ) {
    return this.productV2Service.update(+id, updateProductV2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productV2Service.remove(+id);
  }
}
