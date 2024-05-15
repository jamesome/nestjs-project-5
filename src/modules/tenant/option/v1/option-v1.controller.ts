import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionV1Service } from './option-v1.service';
import { CreateOptionV1Dto } from './dto/create-option-v1.dto';
import { UpdateOptionV1Dto } from './dto/update-option-v1.dto';

@Controller('option')
export class OptionV1Controller {
  constructor(private readonly optionV1Service: OptionV1Service) {}

  @Post()
  create(@Body() createOptionV1Dto: CreateOptionV1Dto) {
    return this.optionV1Service.create(createOptionV1Dto);
  }

  @Get()
  findAll() {
    return this.optionV1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionV1Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOptionV1Dto: UpdateOptionV1Dto,
  ) {
    return this.optionV1Service.update(+id, updateOptionV1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionV1Service.remove(+id);
  }
}
