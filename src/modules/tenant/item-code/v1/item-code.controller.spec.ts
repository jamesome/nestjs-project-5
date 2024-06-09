import { Test, TestingModule } from '@nestjs/testing';
import { ItemCodeController } from './item-code.controller';
import { ItemCodeService } from './item-code.service';

describe('ItemCodeController', () => {
  let controller: ItemCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCodeController],
      providers: [ItemCodeService],
    }).compile();

    controller = module.get<ItemCodeController>(ItemCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
