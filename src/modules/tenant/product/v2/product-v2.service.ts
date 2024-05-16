import { Injectable } from '@nestjs/common';
import { CreateProductV2Dto } from './dto/create-product-v2.dto';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';

@Injectable()
export class ProductV2Service {
  create(createProductV2Dto: CreateProductV2Dto) {
    return 'This action adds a new productV2';
  }

  findAll() {
    return `This action returns all productV2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productV2`;
  }

  update(id: number, updateProductV2Dto: UpdateProductV2Dto) {
    return `This action updates a #${id} productV2`;
  }

  remove(id: number) {
    return `This action removes a #${id} productV2`;
  }
}
