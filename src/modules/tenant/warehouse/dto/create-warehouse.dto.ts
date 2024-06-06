import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { TransformEmptyToNull } from 'src/common/decorators/transform-empty-to-null';

export class CreateWarehouseDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_NOT_EMPTY'),
  })
  @MaxLength(100, {
    message: i18nValidationMessage('validation.LENGTH'),
  })
  @ApiProperty({
    required: true,
    description: '창고명',
    example: '보충창고',
    maxLength: 100,
    uniqueItems: true,
  })
  name!: string;

  @IsOptional()
  @TransformEmptyToNull()
  @MaxLength(100, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: false,
    description: '창고코드',
    example: 'a-01',
    maxLength: 100,
    uniqueItems: true,
  })
  code?: string | null;

  @IsOptional()
  @MaxLength(6, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @Expose({ name: 'post_code' })
  @ApiProperty({
    required: false,
    description: '우편번호',
    example: '12345',
    maxLength: 6,
  })
  postCode?: string;

  @IsOptional()
  @MaxLength(500, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: false,
    description: '주소',
    example: '서울특별시 마포구 공덕',
    maxLength: 500,
  })
  address?: string;

  @IsOptional()
  @MaxLength(500, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @Expose({ name: 'detail_address' })
  @ApiProperty({
    required: false,
    description: '상세주소',
    example: '공덕코어 5층',
    maxLength: 500,
  })
  detailAddress?: string;

  @IsOptional()
  @MaxLength(50, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: false,
    description: '담당자',
    example: '임꺽정',
    maxLength: 50,
  })
  manager?: string;

  @IsOptional()
  @MaxLength(20, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: false,
    description: '담당자 휴대폰번호',
    example: '010-1234-5678',
    maxLength: 20,
  })
  contact?: string;
}
