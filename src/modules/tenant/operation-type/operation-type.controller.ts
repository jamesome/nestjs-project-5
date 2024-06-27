import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { CreateOperationTypeDto } from './dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from './dto/update-operation-type.dto';
import { FindOperationTypeDto } from './dto/find-operation-type.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('operation-types')
@ApiTags('OperationType Api')
export class OperationTypeController {
  constructor(private readonly operationTypeService: OperationTypeService) {}

  @Post()
  create(@Body() createOperationTypeDto: CreateOperationTypeDto) {
    return this.operationTypeService.create(createOperationTypeDto);
  }

  @Get()
  async findAll(@Query() findOperationTypeDto: FindOperationTypeDto) {
    return await this.operationTypeService.findAll(findOperationTypeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.operationTypeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateOperationTypeDto: UpdateOperationTypeDto,
  ) {
    return this.operationTypeService.update(id, updateOperationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.operationTypeService.remove(id);
  }
}
