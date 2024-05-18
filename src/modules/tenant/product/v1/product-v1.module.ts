import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductV1Repository } from './productV1.repository';
import { UniqueProductNameValidator } from 'src/validators/unique-product-name.validator';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductV1Repository, UniqueProductNameValidator],
})
export class ProductV1Module {}
