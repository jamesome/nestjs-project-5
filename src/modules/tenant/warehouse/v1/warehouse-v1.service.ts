import { Injectable } from '@nestjs/common';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';

@Injectable()
export class WarehouseV1Service {
  create(createWarehouseV1Dto: CreateWarehouseV1Dto) {
    return 'This action adds a new warehouseV1' + createWarehouseV1Dto;
  }

  findAll() {
    return `This action returns all warehouseV1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouseV1`;
  }

  update(id: number, updateWarehouseV1Dto: UpdateWarehouseV1Dto) {
    return `This action updates a #${id} warehouseV1` + updateWarehouseV1Dto;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseV1`;
  }
}
