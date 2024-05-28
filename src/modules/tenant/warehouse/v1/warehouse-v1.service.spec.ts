import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseV1Service } from './warehouse-v1.service';
import { CreateWarehouseV1Dto } from './dto/create-warehouse-v1.dto';

describe('WarehouseV1Service', () => {
  let service: WarehouseV1Service;

  beforeEach(async () => {
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseV1Service,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = await module.resolve<WarehouseV1Service>(WarehouseV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const newWarehouse = {
      name: 'warehouse1',
      product: {
        name: 'Phone',
      },
    };

    const result = {
      id: 1,
      ...newWarehouse,
    };

    // jest.spyOn(service, 'create').mockImplementation(result);
    jest.spyOn(service, 'create').mockResolvedValue(result);

    const response = await service.create(newWarehouse);

    expect(response).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(newWarehouse);
  });
});
