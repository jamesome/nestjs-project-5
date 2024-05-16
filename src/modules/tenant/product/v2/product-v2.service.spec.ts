import { Test, TestingModule } from '@nestjs/testing';
import { ProductV2Service } from './product-v2.service';

describe('ProductV2Service', () => {
  let service: ProductV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductV2Service],
    }).compile();

    service = module.get<ProductV2Service>(ProductV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
