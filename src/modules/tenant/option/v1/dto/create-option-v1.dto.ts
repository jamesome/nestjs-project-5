import { Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateOptionV1Dto {
  @Length(2, 10, {
    message: i18nValidationMessage('validation.LENGTH', {
      attribute: 'OPTION_NAME',
    }),
  })
  name!: string;

  @Length(2, 10, {
    message: i18nValidationMessage('validation.LENGTH', {
      attribute: 'OPTION_SIZE',
    }),
  })
  size?: string;

  @Length(2, 10, {
    message: i18nValidationMessage('validation.LENGTH', {
      attribute: 'OPTION_COLOR',
    }),
  })
  color?: string;
}
