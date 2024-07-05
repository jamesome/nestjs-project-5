import { Test, TestingModule } from '@nestjs/testing';
import { ZoneService } from './zone.service';
import { EntityValidationService } from 'src/common/helpers/entity-validation.service';

describe('ZoneService', () => {
  let service: ZoneService;

  beforeEach(async () => {
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZoneService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
        EntityValidationService,
      ],
    }).compile();

    service = module.get<ZoneService>(ZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
