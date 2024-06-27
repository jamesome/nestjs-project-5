import { Test, TestingModule } from '@nestjs/testing';
import { InventoryTransactionService } from './inventory-transaction.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { InventoryTransaction } from './entities/inventory-transaction.entity';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
};

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('InventoryTransactionService', () => {
  let service: InventoryTransactionService;
  let inventoryTransactionRepository: MockRepository<InventoryTransaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryTransactionService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<InventoryTransactionService>(
      InventoryTransactionService,
    );
    inventoryTransactionRepository =
      mockDataSource.getRepository(InventoryTransaction);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(inventoryTransactionRepository).toBeDefined();
  });
});
