import { ArgumentsHost, Catch } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class ThrottlerExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (!(exception instanceof ThrottlerException)) {
      // ThrottlerException은 재 throw하여 처리하지 않고 그대로 통과시킴
      throw exception;
    }

    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof ThrottlerException
          ? exception.message
          : 'Internal Server Error',
    });
  }
}
