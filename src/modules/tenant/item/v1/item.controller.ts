import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';
import { FindItemDto } from './dto/find-item.dto';
import { CreateItemLocationArrayDto } from '../../item-location/dto/create-item-location.array.dto';

@Controller('items')
@ApiTags('Items API')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/inbound')
  async inbound(
    @Body() createItemLocationArrayDto: CreateItemLocationArrayDto,
  ) {
    return await this.itemService.inbound(createItemLocationArrayDto.data);
  }

  @Get()
  async find(@Query() findItemDto: FindItemDto) {
    return await this.itemService.find(findItemDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(+id);
  }
}
