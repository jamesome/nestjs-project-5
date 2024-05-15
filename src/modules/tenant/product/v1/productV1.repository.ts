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

  create(createProductDto: CreateProductDto) {
    return this.productV1Repository.save(createProductDto);
  }

  find() {
    console.log('repositories');
    return this.productV1Repository.find();
  }
}
