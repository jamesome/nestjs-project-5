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
};

const mockQueryBuilder = {
  where: jest.fn(),
  getMany: jest.fn(),
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
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
    // warehouseQueryBuilder = module
    //   .get(getRepositoryToken(Warehouse))
    //   .createQueryBuilder();
    warehouseQueryBuilder = mockDataSource.createQueryBuilder('warehouse');
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
      warehouseQueryBuilder.getMany?.mockReturnValue(findWarehouseDto);
      const result = await service.findAll(findWarehouseDto);

      expect(await service.findAll(findWarehouseDto)).toBe(warehouses);
      expect(warehouseQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.name = :name',
        { name: 'John Doe' },
      );
      expect(warehouseQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.age = :age',
        { age: 30 },
      );
      expect(warehouseQueryBuilder.getMany).toHaveBeenCalled();
      expect(warehouseRepository.createQueryBuilder).toHaveBeenCalledWith(
        'user',
      );
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
