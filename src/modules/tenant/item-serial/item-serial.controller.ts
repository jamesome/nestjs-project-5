import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemSerialService } from './item-serial.service';
import { CreateItemSerialDto } from './dto/create-item-serial.dto';
import { UpdateItemSerialDto } from './dto/update-item-serial.dto';

@Controller('item-serial')
export class ItemSerialController {
  constructor(private readonly itemSerialService: ItemSerialService) {}

  @Post()
  create(@Body() createItemSerialDto: CreateItemSerialDto) {
    return this.itemSerialService.create(createItemSerialDto);
  }

  @Get()
  findAll() {
    return this.itemSerialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemSerialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemSerialDto: UpdateItemSerialDto,
  ) {
    return this.itemSerialService.update(+id, updateItemSerialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemSerialService.remove(+id);
  }
}
