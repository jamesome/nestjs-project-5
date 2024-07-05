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

@Controller('items')
@ApiTags('Item API')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.create(createItemDto);
  }

  @Post('inbound')
  async inbound(@Body() body: { data: any[] }) {
    return await this.itemService.inbound(body.data);
  }

  @Post('movement')
  async movement(@Body() body: { data: any[] }) {
    return await this.itemService.movement(body.data);
  }

  @Get()
  async find(@Query() findItemDto: FindItemDto) {
    return await this.itemService.find(findItemDto);
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
