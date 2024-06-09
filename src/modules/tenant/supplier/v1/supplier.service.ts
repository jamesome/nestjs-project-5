import { Inject, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { DataSource, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  private supplierRepository: Repository<Supplier>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.supplierRepository = this.dataSource.getRepository(Supplier);
  }

  async create(createSupplierDto: CreateSupplierDto) {
    const warehouse = this.supplierRepository.create(createSupplierDto);

    return await this.supplierRepository.save(warehouse);
  }

  async findAll() {
    return `This action returns all supplier`;
  }

  async findOne(id: number) {
    const supplier = this.supplierRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    // if (!supplier) {
    //   return null;
    // }

    return await supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return await this.supplierRepository.update(id, updateSupplierDto);
  }

  async remove(id: number) {
    return await this.supplierRepository.delete(id);
  }
}
