import { Test, TestingModule } from '@nestjs/testing';
import { TenantInfoController } from './tenant-info.controller';
import { TenantInfoService } from './tenant-info.service';

describe('TenantInfoController', () => {
  let controller: TenantInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantInfoController],
      providers: [TenantInfoService],
    }).compile();

    controller = module.get<TenantInfoController>(TenantInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
