import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateItemSerialDto {
  @MaxLength(50, {
    message: i18nValidationMessage('validation.rules.MAX_LENGTH', {
      message: 'item_serial.serial_no',
    }),
  })
  @ApiProperty({
    description: '제품의 고유한 번호',
    example: 'sellmate-00001',
    maxLength: 50,
  })
  @Expose({ name: 'serial_no' })
  serialNo!: string;
}
