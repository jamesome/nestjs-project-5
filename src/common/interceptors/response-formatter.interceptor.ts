import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpStatus } from '../constants';

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.hasOwnProperty('errors')) {
          // PartialResponseInterceptor에서 처리
          return data;
        }

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        if (Array.isArray(data)) {
          response.status(HttpStatus.OK).json({ data, meta: {} });

          return;
        }

        if (!data) {
          request.method === 'GET'
            ? response.status(HttpStatus.NOT_FOUND)
            : response.status(HttpStatus.NO_CONTENT);
          return;
        }

        return data;
      }),
    );
  }
}
