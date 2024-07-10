import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { FindItemDto } from './dto/find-item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('items')
@ApiTags('Item API')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.create(createItemDto);
  }

  @Get()
  async find(
    @Paginate() query: PaginateQuery,
    @Query() findItemDto: FindItemDto,
  ) {
    return await this.itemService.find(query, findItemDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.itemService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.itemService.remove(id);
  }
}
