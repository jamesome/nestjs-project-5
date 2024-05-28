import { Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';
import { UpdateWarehouseV1Dto } from './dto/update-warehouse-v1.dto';
import { DataSource, Repository } from 'typeorm';
import { WarehouseV1 } from './entities/warehouse-v1.entity';
// import { FindWarehouseV1Dto } from './dto/find-warehouse-v1.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

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

  // async findAll(
  //   findWarehouseV1Dto: FindWarehouseV1Dto,
  // ): Promise<Pagination<WarehouseV1>> {
  //   const paginationOptions: IPaginationOptions = {
  //     page: findWarehouseV1Dto.page || 1,
  //     limit: findWarehouseV1Dto.limit || 10,
  //   };

  //   return await paginate(this.warehouseV1Repository, paginationOptions);
  //   // return await this.warehouseV1Repository.find();
  // }

  async findAll(options: IPaginationOptions): Promise<Pagination<WarehouseV1>> {
    return await paginate<WarehouseV1>(this.warehouseV1Repository, options);
  }

  async findOne(id: number) {
    return await this.warehouseV1Repository.findOne({
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
