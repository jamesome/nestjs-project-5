import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { WarehouseV1Service } from './warehouse-v1.service';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';

@Controller({ path: 'warehouse' })
export class WarehouseV1Controller {
  constructor(private readonly warehouseV1Service: WarehouseV1Service) {}

  @Post()
  create(@Body() createWarehouseV1Dto: CreateWarehouseV1Dto) {
    return this.warehouseV1Service.create(createWarehouseV1Dto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 20,
  ) {
    limit = limit > 100 ? 100 : limit; // 최대 페이지 제한
    return this.warehouseV1Service.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.warehouseV1Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWarehouseV1Dto: UpdateWarehouseV1Dto,
  ) {
    return this.warehouseV1Service.update(+id, updateWarehouseV1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseV1Service.remove(+id);
  }
}
