import { Test, TestingModule } from '@nestjs/testing';
import { ItemCodeService } from './item-code.service';

describe('ItemCodeService', () => {
  let service: ItemCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCodeService],
    }).compile();

    service = module.get<ItemCodeService>(ItemCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
