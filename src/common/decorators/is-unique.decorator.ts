import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueValidator } from '../validators/unique.validator';

export function IsUnique(
  domain: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [domain],
      validator: UniqueValidator,
    });
  };
}
