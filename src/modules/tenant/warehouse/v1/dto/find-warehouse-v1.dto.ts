import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseV1Dto } from './create-warehouse-v1.dto';
import { PaginateDto } from './paginate.dto';

export class FindWarehouseV1Dto extends IntersectionType(
  PaginateDto,
  PartialType(CreateWarehouseV1Dto),
) {}
