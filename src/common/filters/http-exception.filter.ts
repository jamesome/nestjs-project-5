import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
// import { HttpStatus } from '../constants';
import { I18nContext } from 'nestjs-i18n';
import { CustomHttpException } from '../exceptions/custom-http-exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const exceptionResponse = exception.getResponse();
    const statusCode = exception.getStatus();

    if (exception instanceof CustomHttpException) {
      response.status(statusCode).json({
        statusCode,
        message: exception.getMessage(),
        errors: {
          children: [
            {
              value: '',
              property: '',
              children: [],
              constraints: {
                error:
                  i18n?.t(`error.${exceptionResponse['error']}`) ||
                  'Internal Server Error',
              },
            },
          ],
          constraints: {},
        },
      });
    } else {
      response.status(statusCode).json({
        statusCode,
        message: exception.getResponse()['error'],
        errors: {
          children: [],
          constraints: {
            error: exception.getResponse()['message'],
          },
        },
      });
    }
  }
}
