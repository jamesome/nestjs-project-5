import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductV1Repository } from './productV1.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductV1Repository],
})
export class ProductV1Module {}
