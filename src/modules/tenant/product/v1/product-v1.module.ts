import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductV1Repository } from './productV1.repository';
import { UniqueValidator } from 'src/common/validators/unique.validator';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductV1Repository,
    {
      provide: 'REPOSITORY',
      useFactory: (productV1Repository: ProductV1Repository) => ({
        ProductV1Repository: productV1Repository,
      }),
      inject: [ProductV1Repository],
    },
    UniqueValidator,
  ],
})
export class ProductV1Module {}
