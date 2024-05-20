import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Scope,
} from '@nestjs/common';
import { WarehouseV1Service } from './warehouse-v1.service';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';

@Controller({ path: 'warehouse', scope: Scope.REQUEST })
export class WarehouseV1Controller {
  constructor(private readonly warehouseV1Service: WarehouseV1Service) {}

  @Post()
  create(@Body() createWarehouseV1Dto: CreateWarehouseV1Dto) {
    return this.warehouseV1Service.create(createWarehouseV1Dto);
  }

  @Get()
  findAll() {
    return this.warehouseV1Service.findAll();
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
