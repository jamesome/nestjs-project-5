import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { InventoryItemService } from './inventory-item.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';

@Controller('inventory-items')
@ApiTags('Location Api')
export class InventoryItemController {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

  @Post()
  async create(@Body() createInventoryItemDto: CreateInventoryItemDto) {
    return await this.inventoryItemService.create(createInventoryItemDto);
  }

  @Get()
  async findAll(
    @Param('warehouseId') warehouseId: number,
    @Param('locationId') locationId: number,
  ) {
    return await this.inventoryItemService.findAll(warehouseId, locationId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInventoryItemDto: UpdateInventoryItemDto,
  ) {
    return await this.inventoryItemService.update(id, updateInventoryItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.inventoryItemService.remove(id);
  }
}
