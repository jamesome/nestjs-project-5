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
    console.log(exception);
    // MySQL의 중복 키 오류 코드: ER_DUP_ENTRY
    if (exception.message.includes('Duplicate entry')) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        // 사용예시
        // message: i18n?.t('database.DUPLICATE_ENTRY', {
        //   lang: i18n?.lang,
        //   args: {
        //     attribute: 'PRODUCT_NAME',
        //   },
        // }),
        message: i18n?.t('database.DUPLICATE_ENTRY'),
        error: 'UNPROCESSABLE ENTITY',
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: 'Internal Server Error',
      });
    }
  }
}
