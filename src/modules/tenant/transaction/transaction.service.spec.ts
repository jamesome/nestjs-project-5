import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { I18nService } from 'nestjs-i18n';
import { LotService } from '../lot/lot.service';
import { StockStatus } from '../enum';
import { IncomingInventoryItemDto } from '../inventory-item/dto/inbound-inventory-item.dto';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
};

const mockQueryRunner = {
  connect: jest.fn().mockReturnThis(),
  startTransaction: jest.fn().mockReturnThis(),
  commitTransaction: jest.fn().mockReturnThis(),
  rollbackTransaction: jest.fn().mockReturnThis(),
  release: jest.fn().mockReturnThis(),
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
  createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionRepository: MockRepository<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        LotService,
        I18nService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionRepository = mockDataSource.getRepository(Transaction);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(transactionRepository).toBeDefined();
  });

  describe('inbound()', () => {
    it('should be inbound', async () => {
      const itemId1 = 1;
      const itemId2 = 2;
      const locationId = 12;
      const quantity = 3;
      const status = StockStatus.ABNORMAL;
      const incomingInventoryItemDto: IncomingInventoryItemDto[] = [
        {
          itemId: itemId1,
          locationId: locationId,
          supplierId: 1,
          operationTypeId: 1,
          quantity: quantity,
          remark: '',
          lotNo: null,
          itemSerial: {
            serialNo: '',
          },
          status: status,
        },
        {
          itemId: itemId2,
          locationId: locationId,
          supplierId: 1,
          operationTypeId: 1,
          quantity: quantity,
          remark: '',
          lotNo: null,
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

      transactionRepository.findOne
        ?.mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          itemId: itemId2,
          locationId: locationId,
          status: status,
          quantity: quantity,
        });

      await service.incoming(incomingInventoryItemDto);

      expect(queryRunner.manager.insert).toHaveBeenCalledTimes(1);
      expect(queryRunner.manager.update).toHaveBeenCalledTimes(1);

      expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(2);
      // expect(queryRunner.release).toHaveBeenCalledTimes(1);
    });
  });
});
