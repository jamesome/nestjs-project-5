import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { HttpStatus } from '../constants';

@Injectable()
export class PartialResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((responseData) => {
        const response = context.switchToHttp().getResponse();
        const responseLength = responseData.length;

        if (responseLength === request.body.data.length) {
          response.status(HttpStatus.BAD_REQUEST);

          return { errors: responseData };
        } else if (responseLength > 0) {
          response.status(HttpStatus.MULTI_STATUS);

          return { errors: responseData };
        }

        return responseData;
      }),
    );
  }
}
