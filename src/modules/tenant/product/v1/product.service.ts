import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductV1Repository } from './productV1.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productV1Repository: ProductV1Repository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productV1Repository.create(createProductDto);
  }

  async findAll() {
    return await this.productV1Repository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product` + updateProductDto;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
