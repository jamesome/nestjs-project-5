import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseV1Service } from './warehouse-v1.service';

describe('WarehouseV1Service', () => {
  let service: WarehouseV1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseV1Service],
    }).compile();

    service = module.get<WarehouseV1Service>(WarehouseV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
