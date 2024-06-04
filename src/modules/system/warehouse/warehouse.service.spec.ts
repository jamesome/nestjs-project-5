import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

const mockWarehouseRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockWarehouseRepository),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('WarehouseService', () => {
  let service: WarehouseService;
  let warehouseRepository: MockRepository<Warehouse>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
    warehouseRepository = mockDataSource.getRepository(Warehouse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const createWarehouseDto: CreateWarehouseDto = {
      name: '창고-1',
      code: '',
      postCode: '',
      address: '',
      detailAddress: '',
      manager: '',
      contact: '',
    };

    const createdWarehouse = {
      ...createWarehouseDto,
      createWorker: 'create_worker_name',
    };

    it('should fail on exception', async () => {
      warehouseRepository.create?.mockReturnValue(createWarehouseDto);
      warehouseRepository.save?.mockResolvedValue('save error');

      const result = await service.create(createWarehouseDto);

      expect(result).toEqual('save error');
    });
    it('should create Posts', async () => {
      warehouseRepository.create?.mockReturnValue(createWarehouseDto);
      warehouseRepository.save?.mockResolvedValue(createdWarehouse);

      const result = await service.create(createWarehouseDto);

      expect(warehouseRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
      expect(result).toEqual(createdWarehouse);
    });
  });

  describe('remove()', () => {
    it('should be remove post', async () => {
      const warehouse = { id: 123, name: 'Warehouse 1' } as Warehouse;

      warehouseRepository.findOne?.mockResolvedValue(warehouse);
      warehouseRepository.delete?.mockResolvedValue(undefined);

      await service.remove(warehouse.id);

      expect(warehouseRepository.delete).toHaveBeenCalledWith(123);
    });
  });
});
