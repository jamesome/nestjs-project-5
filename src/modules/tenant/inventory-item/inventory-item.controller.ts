import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { InventoryItemService } from './inventory-item.service';

@Controller([
  'inventory-items',
  'warehouses/:warehouseId/locations/:locationId/inventory-items',
])
@ApiTags('InventoryItems Api')
export class InventoryItemController {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

  @Get()
  async findAll(
    @Param('warehouseId') warehouseId: number,
    @Param('locationId') locationId: number,
  ) {
    return await this.inventoryItemService.findAll(warehouseId, locationId);
  }
}
