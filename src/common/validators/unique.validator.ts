import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repositories: Record<string, any>,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [domain] = args.constraints;
    const repository = this.repositories[domain];

    if (!repository) {
      throw new Error(`Repository for domain ${domain} not found`);
    }

    const result = await repository.checkExists(value);
    return !result;
  }

  defaultMessage(args: ValidationArguments): string {
    const [domain] = args.constraints;
    return `${domain} with value ($value) already exists. Choose another value.`;
  }
}
