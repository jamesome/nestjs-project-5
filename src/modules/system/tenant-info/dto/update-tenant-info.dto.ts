import { PartialType } from '@nestjs/swagger';
import { CreateTenantInfoDto } from './create-tenant-info.dto';

export class UpdateTenantInfoDto extends PartialType(CreateTenantInfoDto) {}
