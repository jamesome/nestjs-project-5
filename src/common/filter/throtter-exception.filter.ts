import { ArgumentsHost, Catch } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class ThrottlerExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof ThrottlerException ? exception.getStatus() : 500;

    response.status(status).json({
      message:
        exception instanceof ThrottlerException
          ? exception.message
          : 'Internal Server Error',
    });
  }
}
