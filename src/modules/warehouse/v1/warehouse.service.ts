import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Warehouse, 'system')
    private warehouse2Repository: Repository<Warehouse>,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    const { name } = createWarehouseDto;
    const newWarehouse = new Warehouse();

    newWarehouse.name = name;

    return await this.warehouseRepository.save(newWarehouse);
  }

  async findAll() {
    return await this.warehouseRepository.find();
  }

  async findAll2() {
    return await this.warehouse2Repository.find();
  }

  async findOne(id: number) {
    return await this.warehouseRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
