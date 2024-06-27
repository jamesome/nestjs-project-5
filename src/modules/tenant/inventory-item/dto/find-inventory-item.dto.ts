import { PartialType } from '@nestjs/swagger';
import { CreateInventoryItemDto } from './create-inventory-item.dto';

export class FindInventoryItemDto extends PartialType(CreateInventoryItemDto) {}
