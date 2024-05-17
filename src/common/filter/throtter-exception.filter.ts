import { ArgumentsHost, Catch } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class ThrottlerExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
