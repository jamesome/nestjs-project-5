import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { Like, ObjectLiteral, Repository } from 'typeorm';
import { FindItemDto } from './dto/find-item.dto';

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('ItemService', () => {
  let service: ItemService;
  let itemRepository: MockRepository<Item>;

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

      const items = await service.findItem(findItemDto);

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
      expect(items).toEqual(mockItems);
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

      const items = await service.findItem(findItemDto);

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
      expect(items).toEqual(mockItems);
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
});
