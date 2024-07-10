import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindWarehouseDto } from './dto/find-warehouse.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('warehouses')
@ApiTags('Warehouse API')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
    @Query() findWarehouseDto: FindWarehouseDto,
  ) {
    return await this.warehouseService.findAll(query, findWarehouseDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.warehouseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return await this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const warehouse = await this.warehouseService.findOne(id);
    if (!warehouse) {
      // throw new Exception('User does not exist!');
    }

    return await this.warehouseService.remove(id);
  }

  // @Delete()
  // async removeBulk(@Body('ids') ids: number[]) {
  //   return await this.warehouseService.remove(ids);
  // }
}
