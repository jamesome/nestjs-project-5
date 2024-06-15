import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { FindWarehouseDto } from './dto/find-warehouse.dto';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getMany: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
};

const mockQueryBuilder = {
  select: jest.fn(),
  where: jest.fn(),
  andWhere: jest.fn(),
  addSelect: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('WarehouseService', () => {
  let service: WarehouseService;
  let warehouseRepository: MockRepository<Warehouse>;
  let warehouseQueryBuilder: any;

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

  describe('findAll()', () => {
    const findWarehouseDto: FindWarehouseDto = {
      id: 1,
      name: '창고-1',
      code: 'a-00001',
      address: '서울시 마포구 공덕',
    };
    const warehouses = [
      { id: 1, name: '창고-1', code: null },
      { id: 2, name: '창고-2', code: 'a-00002' },
    ];

    it('should return a warehouses', async () => {
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      mockRepository.getMany.mockResolvedValue(warehouses);

      const result = await service.findAll(findWarehouseDto);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalled();
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      result?.forEach((item, index) => {
        expect(item.name).toBe(warehouses[index].name);
        expect(item.code).toBe(warehouses[index].code);
      });
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
