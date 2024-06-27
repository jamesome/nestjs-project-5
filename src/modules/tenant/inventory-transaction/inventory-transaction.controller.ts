import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { InventoryTransactionService } from './inventory-transaction.service';
import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';
import { FindInventoryTransactionDto } from './dto/find-inventory-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('inventory-transactions')
@ApiTags('InventoryTransaction API')
export class InventoryTransactionController {
  constructor(
    private readonly inventoryTransactionService: InventoryTransactionService,
  ) {}

  @Post()
  async create(
    @Body() createInventoryTransactionDto: CreateInventoryTransactionDto,
  ) {
    return await this.inventoryTransactionService.create(
      createInventoryTransactionDto,
    );
  }

  @Get()
  async findAll(
    @Query() findInventoryTransactionDto: FindInventoryTransactionDto,
  ) {
    return await this.inventoryTransactionService.findAll(
      findInventoryTransactionDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.inventoryTransactionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInventoryTransactionDto: UpdateInventoryTransactionDto,
  ) {
    return await this.inventoryTransactionService.update(
      id,
      updateInventoryTransactionDto,
    );
  }
}
