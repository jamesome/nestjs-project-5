import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseV1Controller } from './warehouse-v1.controller';
import { WarehouseV1Service } from './warehouse-v1.service';

describe('WarehouseV1Controller', () => {
  let controller: WarehouseV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseV1Controller],
      providers: [WarehouseV1Service],
    }).compile();

    controller = module.get<WarehouseV1Controller>(WarehouseV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
