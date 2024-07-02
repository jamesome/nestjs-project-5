import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';
import { FindItemDto } from './dto/find-item.dto';

@Controller('items')
@ApiTags('Items API')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async find(@Query() findItemDto: FindItemDto) {
    return await this.itemService.find(findItemDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(+id);
  }
}
