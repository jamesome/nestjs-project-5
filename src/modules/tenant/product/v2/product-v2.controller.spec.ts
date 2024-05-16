import { Test, TestingModule } from '@nestjs/testing';
import { ProductV2Controller } from './product-v2.controller';
import { ProductV2Service } from './product-v2.service';

describe('ProductV2Controller', () => {
  let controller: ProductV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductV2Controller],
      providers: [ProductV2Service],
    }).compile();

    controller = module.get<ProductV2Controller>(ProductV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
