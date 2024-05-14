import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { TenantInfoService } from './tenant-info.service';
// import { CreateTenantInfoDto } from './dto/create-tenant-info.dto';
// import { UpdateTenantInfoDto } from './dto/update-tenant-info.dto';

@Controller('tenant-info')
export class TenantInfoController {
  constructor(private readonly tenantInfoService: TenantInfoService) {}

  @Post()
  create() {
    return this.tenantInfoService.create();
  }

  @Get()
  findAll() {
    return this.tenantInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.tenantInfoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantInfoService.remove(+id);
  }
}
