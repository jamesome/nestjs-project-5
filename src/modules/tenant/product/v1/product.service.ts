import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductV1Repository } from './productV1.repository';
import { FindProductDto } from './dto/find-product.dto';
import { ItemProductDto } from './dto/item-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productV1Repository: ProductV1Repository) {}

  async create(itemProductDto: ItemProductDto) {
    return await this.productV1Repository.create(itemProductDto);
  }

  async findAll(findProductDto: FindProductDto) {
    return await this.productV1Repository.findAll(findProductDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productV1Repository.update(+id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
