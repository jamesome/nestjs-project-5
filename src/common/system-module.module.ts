import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SystemModule } from 'src/modules/system.module';
import { TenantInfoModule } from 'src/modules/system/tenant-info/tenant-info.module';

@Module({
  imports: [
    TenantInfoModule,
    RouterModule.register([
      {
        path: 'system',
        module: SystemModule,
        children: [TenantInfoModule],
      },
    ]),
  ],
})
export class SystemModuleModule {}
