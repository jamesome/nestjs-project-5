import { Injectable } from '@nestjs/common';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';
import { WarehouseV1Repository } from './warehouse-v1-repository';

@Injectable()
export class WarehouseV1Service {
  constructor(private readonly warehouseV1Repository: WarehouseV1Repository) {}

  async create(createWarehouseV1Dto: CreateWarehouseV1Dto) {
    return await this.warehouseV1Repository.create(createWarehouseV1Dto);
  }

  async findAll() {
    return await this.warehouseV1Repository.findAll();
  }

  async findOne(id: number) {
    return await this.warehouseV1Repository.findOne(id);
  }

  update(id: number, updateWarehouseV1Dto: UpdateWarehouseV1Dto) {
    return `This action updates a #${id} warehouseV1` + updateWarehouseV1Dto;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseV1`;
  }
}
