import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindLocationDto } from '../location/dto/find-location.dto';

@Controller(['zones', 'warehouses/:warehouseId/zones'])
@ApiTags('Zone APi')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  async create(@Body() createZoneDto: CreateZoneDto) {
    return await this.zoneService.create(createZoneDto);
  }

  // @Get()
  // async findAll(@Query() findLocationDto: FindLocationDto) {
  //   return await this.zoneService.findAll(findLocationDto);
  // }

  @Get()
  async findAll(
    @Param('warehouseId') warehouseId: number | null,
    @Query() findLocationDto: FindLocationDto,
  ) {
    return await this.zoneService.findAll(warehouseId, findLocationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.zoneService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateZoneDto: UpdateZoneDto) {
    return await this.zoneService.update(id, updateZoneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.zoneService.remove(id);
  }
}
