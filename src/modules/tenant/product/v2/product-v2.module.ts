import { Module } from '@nestjs/common';
import { ProductV2Service } from './product-v2.service';
import { ProductV2Controller } from './product-v2.controller';

@Module({
  controllers: [ProductV2Controller],
  providers: [ProductV2Service],
})
export class ProductV2Module {}
