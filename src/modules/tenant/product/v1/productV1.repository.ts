import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductV1 } from './entities/productV1.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductV1Repository {
  private productV1Repository: Repository<ProductV1>;

  constructor(private readonly dataSource: DataSource) {
    this.productV1Repository = this.dataSource.getRepository(ProductV1);
  }

  async create(createProductDto: CreateProductDto) {
    const warehouse = this.productV1Repository.create(createProductDto);
    return await this.productV1Repository.save(warehouse);
  }

  async findAll() {
    return await this.productV1Repository.find({
      relations: {
        options: true,
        // warehouse: true,
      },
    });
  }

  async checkExists(name: string): Promise<boolean> {
    const result = await this.productV1Repository.find({
      where: { name },
    });

    if (result.length) return true;
    return false;
  }
}
