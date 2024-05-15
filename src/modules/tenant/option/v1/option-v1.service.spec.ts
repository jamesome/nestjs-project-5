import { Test, TestingModule } from '@nestjs/testing';
import { OptionV1Service } from './option-v1.service';

describe('OptionV1Service', () => {
  let service: OptionV1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionV1Service],
    }).compile();

    service = module.get<OptionV1Service>(OptionV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
