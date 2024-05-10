import { Injectable } from '@nestjs/common';
import { CreateTenantInfoDto } from './dto/create-tenant-info.dto';
import { UpdateTenantInfoDto } from './dto/update-tenant-info.dto';

@Injectable()
export class TenantInfoService {
  create(createTenantInfoDto: CreateTenantInfoDto) {
    return 'This action adds a new tenantInfo';
  }

  findAll() {
    return `This action returns all tenantInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenantInfo`;
  }

  update(id: number, updateTenantInfoDto: UpdateTenantInfoDto) {
    return `This action updates a #${id} tenantInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenantInfo`;
  }
}
