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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FindLocationDto } from './dto/find-location.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller(['locations', 'warehouses/:warehouseId/locations'])
@ApiTags('Location Api')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }

  // @Get()
  // async findAll(@Query() findLocationDto: FindLocationDto) {
  //   return await this.locationService.findAll(findLocationDto);
  // }

  @Get()
  async findAll(
    @Param('warehouseId') warehouseId: number | null,
    @Query() findLocationDto: FindLocationDto,
  ) {
    return await this.locationService.findAll(warehouseId, findLocationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.locationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return await this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.locationService.remove(id);
  }
}
