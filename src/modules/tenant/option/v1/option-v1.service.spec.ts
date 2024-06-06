import { Test, TestingModule } from '@nestjs/testing';
import { OptionV1Service } from './option-v1.service';

describe('OptionV1Service', () => {
  let service: OptionV1Service;

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
        OptionV1Service,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<OptionV1Service>(OptionV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
