import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repositories: Record<string, any>,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    console.log('-------------222');
    console.log(this.repositories);
    console.log('-------------333');
    const entity = args.constraints[0];
    const repository = this.repositories[entity];
    if (!repository) {
      throw new Error(`Repository for entity ${entity} not found`);
    }

    const result = await repository.checkExists(value);
    return !result;
  }

  defaultMessage(args: ValidationArguments): string {
    const [domain] = args.constraints;
    return `${domain} with value ($value) already exists. Choose another value.`;
  }
}
