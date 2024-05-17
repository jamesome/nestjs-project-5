import { DataSource, Repository } from 'typeorm';
import { WarehouseV1 } from './entities/warehouse-v1.entity';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseV1Repository {
  private warehouseV1Repository: Repository<WarehouseV1>;

  constructor(private readonly dataSource: DataSource) {
    this.warehouseV1Repository = this.dataSource.getRepository(WarehouseV1);
  }

  async create(createWarehouseV1Dto: CreateWarehouseV1Dto) {
    const warehouse = this.warehouseV1Repository.create(createWarehouseV1Dto);
    return await this.warehouseV1Repository.save(warehouse);
  }

  async findAll() {
    return await this.warehouseV1Repository.find({
      relations: {
        product: true,
      },
    });
  }
}
