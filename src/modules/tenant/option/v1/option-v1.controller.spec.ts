import { Test, TestingModule } from '@nestjs/testing';
import { OptionV1Controller } from './option-v1.controller';
import { OptionV1Service } from './option-v1.service';

describe('OptionV1Controller', () => {
  let controller: OptionV1Controller;

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
      controllers: [OptionV1Controller],
      providers: [
        OptionV1Service,
        {
          provide: 'CONNECTION',
          useValue: mockDataSource,
        },
      ],
    }).compile();

    controller = module.get<OptionV1Controller>(OptionV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
