import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { EntityValidationService } from 'src/common/helpers/entity-validation.service';

describe('LocationService', () => {
  let service: LocationService;

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
        LocationService,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
        EntityValidationService,
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
