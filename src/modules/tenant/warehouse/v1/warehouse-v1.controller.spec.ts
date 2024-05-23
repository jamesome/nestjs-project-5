import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseV1Controller } from './warehouse-v1.controller';
import { WarehouseV1Service } from './warehouse-v1.service';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';

describe('WarehouseV1Controller', () => {
  let controller: WarehouseV1Controller;

  beforeEach(async () => {
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        create: jest
          .fn()
          .mockReturnValue({ id: 1, ...new CreateWarehouseV1Dto() }),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseV1Controller],
      providers: [
        WarehouseV1Service,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    controller = await module.resolve<WarehouseV1Controller>(
      WarehouseV1Controller,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
