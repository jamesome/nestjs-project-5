import { PartialType } from '@nestjs/swagger';
import { CreateOptionV1Dto } from './create-option-v1.dto';

export class UpdateOptionV1Dto extends PartialType(CreateOptionV1Dto) {}
