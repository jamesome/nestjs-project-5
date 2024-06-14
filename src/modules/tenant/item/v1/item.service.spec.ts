import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { Like, ObjectLiteral, Repository } from 'typeorm';
import { FindItemDto } from './dto/find-item.dto';
import { StockStatus } from '../../location/v1/entities/enum';
import { CreateItemLocationDto } from '../../item-location/dto/create-item-location.dto';
import { ItemLocation } from '../../item-location/entities/item-location.entity';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
};

const mockQueryBuilder = {
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getItemMany: jest.fn(),
};

const mockQueryRunner = {
  connect: jest.fn().mockReturnThis(),
  startTransaction: jest.fn().mockReturnThis(),
  commitTransaction: jest.fn().mockReturnThis(),
  rollbackTransaction: jest.fn().mockReturnThis(),
  release: jest.fn().mockReturnThis(),
  manager: {
    update: jest.fn(),
    insert: jest.fn(),
  },
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
  createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('ItemService', () => {
  let service: ItemService;
  let itemRepository: MockRepository<Item>;
  let itemLocationRepository: MockRepository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
    itemRepository = mockDataSource.getRepository(Item);
    itemLocationRepository = mockDataSource.getRepository(ItemLocation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findItems', () => {
    it('should be getManyItemsWithOutInventoryList', async () => {
      const findItemDto: FindItemDto = {
        includeInventory: 0,
        name: 'testName',
        property: 'testProperty',
        itemCode: 'testCode',
      };

      const mockItems = [
        {
          id: 1,
          name: 'testName',
          property: 'test',
          itemCodes: [
            { id: 1, code: 'aaa' },
            { id: 2, code: 'bbb' },
          ],
          suppliers: [
            { id: 1, name: '1q1q' },
            { id: 2, name: '2w2w' },
          ],
        },
      ];
      itemRepository.find?.mockResolvedValue(mockItems);

      const items = await service.find(findItemDto);

      const expectedFindOptions = {
        where: {
          name: Like(`%${findItemDto.name}%`),
          property: Like(`%${findItemDto.property}%`),
          itemCodes: { code: Like(`%${findItemDto.itemCode}%`) },
        },
        order: {
          createdAt: 'DESC',
          id: 'DESC',
        },
      };

      // itemRepository의 find 메서드가 올바른 findOptions와 함께 호출되었는지 확인
      expect(itemRepository.find).toHaveBeenCalledTimes(1);
      expect(itemRepository.find).toHaveBeenCalledWith(expectedFindOptions);
      items?.forEach((item, index) => {
        expect(item.name).toBe(mockItems[index].name);
        expect(item.property).toBe(mockItems[index].property);
      });
    });

    it('should be getManyItemsWithInventoryList', async () => {
      const findItemDto: FindItemDto = {
        includeInventory: 1,
        name: 'testName',
        property: 'testProperty',
        itemCode: 'testCode',
      };

      const mockItems = [
        {
          id: 1,
          name: 'testName',
          property: 'testProperty',
          itemCodes: [
            { id: 1, code: 'aaa' },
            { id: 2, code: 'bbb' },
          ],
          suppliers: [
            { id: 1, name: 'supplier1' },
            { id: 2, name: 'supplier2' },
          ],
          quantity_total: 100,
          quantity_available: 80,
          quantity_non_available: 20,
          quantity_by_zone: JSON.stringify([
            { zone_id: 1, zone_name: 'zone1', quantity: 50 },
            { zone_id: 2, zone_name: 'zone2', quantity: 50 },
          ]),
        },
      ];

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      mockQueryBuilder.getItemMany.mockResolvedValue(mockItems);

      const items = await service.getManyItemsWithInventoryList(findItemDto);

      expect(mockQueryBuilder.select).toHaveBeenCalled();
      expect(mockQueryBuilder.addSelect).toHaveBeenCalled();
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalled();
      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
      expect(mockQueryBuilder.groupBy).toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalled();
      expect(mockQueryBuilder.getItemMany).toHaveBeenCalled();
      items?.forEach((item, index) => {
        expect(item.name).toBe(mockItems[index].name);
        expect(item.property).toBe(mockItems[index].property);
        expect(item.quantity_total).toBe(mockItems[index].quantity_total);
        expect(item.quantity_available).toBe(
          mockItems[index].quantity_available,
        );
      });
    });
  });

  describe('findOne', () => {
    const findOneArgs = { where: { id: 1 } };
    const mockedItem = {
      id: 1,
      name: 'ice',
      property: 'green',
    };
    it('should be defined', async () => {
      itemRepository.findOne?.mockResolvedValue(mockedItem);

      const result = await service.findOne(1);

      expect(itemRepository.findOne).toHaveBeenCalledTimes(1);
      expect(itemRepository.findOne).toHaveBeenCalledWith(findOneArgs);
      expect(result).toEqual(mockedItem);
    });
  });

  describe('inbound()', () => {
    it('should be inbound', async () => {
      const itemId1 = 1;
      const itemId2 = 2;
      const locationId = 12;
      const quantity = 3;
      const status = StockStatus.ABNORMAL;
      const createItemLocationDto: CreateItemLocationDto[] = [
        {
          itemId: itemId1,
          locationId: locationId,
          supplierId: 1,
          quantity: quantity,
          remark: '',
          lotNo: '',
          expirationDate: null,
          itemSerial: {
            serialNo: '',
          },
          status: status,
        },
        {
          itemId: itemId2,
          locationId: locationId,
          supplierId: 1,
          quantity: quantity,
          remark: '',
          lotNo: '',
          expirationDate: null,
          itemSerial: {
            serialNo: '',
          },
          status: status,
        },
      ];

      const queryRunner = mockDataSource.createQueryRunner();
      queryRunner.manager = {
        update: jest.fn(),
        insert: jest.fn(),
      };

      itemLocationRepository.findOne
        ?.mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          itemId: itemId2,
          locationId: locationId,
          status: status,
          quantity: quantity,
        });

      await service.inbound(createItemLocationDto);

      expect(queryRunner.manager.insert).toHaveBeenCalledTimes(1);
      expect(queryRunner.manager.update).toHaveBeenCalledTimes(1);

      expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(2);
      expect(queryRunner.release).toHaveBeenCalledTimes(1);
    });
  });
});
