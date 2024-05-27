import { Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';
import { DataSource, Repository } from 'typeorm';
import { WarehouseV1 } from './entities/warehouse-v1.entity';
import { PaginationResult, paginate } from 'src/common/helpers/pagination';

@Injectable()
export class WarehouseV1Service {
  private warehouseV1Repository: Repository<WarehouseV1>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.warehouseV1Repository = this.dataSource.getRepository(WarehouseV1);
  }

  async create(createWarehouseV1Dto: CreateWarehouseV1Dto) {
    const warehouse = this.warehouseV1Repository.create(createWarehouseV1Dto);
    return await this.warehouseV1Repository.insert(warehouse);
  }

  // async findAll() {
  //   return await this.warehouseV1Repository.find();
  // }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginationResult<WarehouseV1>> {
    return paginate(this.warehouseV1Repository, { page, limit });
  }

  async findOne(id: number) {
    return await this.warehouseV1Repository.find({
      relations: {
        product: true,
      },
      where: { id },
    });
  }

  update(id: number, updateWarehouseV1Dto: UpdateWarehouseV1Dto) {
    return `This action updates a #${id} warehouseV1` + updateWarehouseV1Dto;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseV1`;
  }
}
