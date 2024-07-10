import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter<T extends QueryFailedError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const i18n = I18nContext.current<I18nTranslations>(host);

    // MySQL의 중복 키 오류 코드: ER_DUP_ENTRY
    if (exception.message.includes('Duplicate entry')) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'UNPROCESSABLE_ENTITY',
        errors: [
          {
            children: [
              {
                value: '',
                property: '',
                children: [],
                constraints: { error: i18n?.t('database.DUPLICATE_ENTRY') },
              },
            ],
            constraints: {},
          },
        ],
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'INTERNAL_SERVER_ERROR',
        errors: [
          {
            children: [],
            constraints: { error: exception.message },
          },
        ],
      });
    }
  }
}
