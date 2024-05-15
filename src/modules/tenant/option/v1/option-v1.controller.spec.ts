import { Test, TestingModule } from '@nestjs/testing';
import { OptionV1Controller } from './option-v1.controller';
import { OptionV1Service } from './option-v1.service';

describe('OptionV1Controller', () => {
  let controller: OptionV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionV1Controller],
      providers: [OptionV1Service],
    }).compile();

    controller = module.get<OptionV1Controller>(OptionV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
