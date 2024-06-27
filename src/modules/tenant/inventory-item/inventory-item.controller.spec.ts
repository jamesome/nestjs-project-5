import { Test, TestingModule } from '@nestjs/testing';
import { InventoryItemService } from './inventory-item.service';
import { EntityValidationService } from 'src/common/helpers/entity-validation.service';
import { InventoryItemController } from './inventory-item.controller';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

describe('LocationController', () => {
  let controller: InventoryItemController;

  beforeEach(async () => {
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        create: jest
          .fn()
          .mockReturnValue({ id: 1, ...new CreateInventoryItemDto() }),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryItemController],
      providers: [
        InventoryItemService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
        EntityValidationService,
      ],
    }).compile();

    controller = module.get<InventoryItemController>(InventoryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
