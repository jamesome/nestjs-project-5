import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsInt, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FindLocationDto extends PartialType(CreateLocationDto) {
  @IsOptional()
  @Expose({ name: 'create_worker' })
  @ApiProperty({
    required: false,
    description: '로케이션 생성자',
    example: '홍길동',
    maxLength: 50,
  })
  createWorker?: string;

  @IsOptional()
  @Expose({ name: 'zone_name' })
  zoneName!: string;

  @IsOptional()
  @IsInt({
    message: i18nValidationMessage('validation.IS_INT'),
  })
  @Expose({ name: 'warehouse_id' })
  warehouseId!: number;
}
