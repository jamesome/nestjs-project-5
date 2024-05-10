import { Module } from '@nestjs/common';
import { TenantInfoService } from './tenant-info.service';
import { TenantInfoController } from './tenant-info.controller';

@Module({
  controllers: [TenantInfoController],
  providers: [TenantInfoService],
})
export class TenantInfoModule {}
