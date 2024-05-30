import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'SUCCESS',
            result: null,
          };
        }

        const response = context.switchToHttp().getResponse();

        return {
          statusCode: response.statusCode,
          message: response.statusMessage || 'SUCCESS',
          result: data,
        };
      }),
    );
  }
}
