import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseV1Dto } from './create-warehouse-v1.dto';

export class UpdateWarehouseV1Dto extends PartialType(CreateWarehouseV1Dto) {}
