import { Test, TestingModule } from '@nestjs/testing';
import { TenantInfoService } from './tenant-info.service';

describe('TenantInfoService', () => {
  let service: TenantInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantInfoService],
    }).compile();

    service = module.get<TenantInfoService>(TenantInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
