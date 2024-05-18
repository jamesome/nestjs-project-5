import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductV1Repository } from 'src/modules/tenant/product/v1/productV1.repository';

@ValidatorConstraint({ name: 'UniqueProduct', async: true })
@Injectable()
export class UniqueProductNameValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly productV1Repository: ProductV1Repository) {}

  async validate(productName: string): Promise<boolean> {
    const result =
      await this.productV1Repository.checkProductNameExists(productName);
    return !result;
  }

  defaultMessage(args: ValidationArguments): string {
    console.log(args);
    return 'Product name ($value) already exists. Choose another name.' + args;
  }
}
