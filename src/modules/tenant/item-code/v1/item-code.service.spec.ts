import { Test, TestingModule } from '@nestjs/testing';
import { ItemCodeService } from './item-code.service';

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }),
};

describe('ItemCodeService', () => {
  let service: ItemCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemCodeService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ItemCodeService>(ItemCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
