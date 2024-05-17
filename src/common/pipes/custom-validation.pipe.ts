import {
  Injectable,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) => {
          if (error.constraints) {
            return Object.values(error.constraints).join(', ');
          }

          return '유효성 검사 오류가 발생했습니다.';
        });

        return new BadRequestException(errorMessages.join(', '));
      },
    });
  }
}
