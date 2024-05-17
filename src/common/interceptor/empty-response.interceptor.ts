import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log('before EmptyResponseInterceptor');

        if (!data || data.length === 0) {
          const response = context.switchToHttp().getResponse();
          response.status(HttpStatus.NO_CONTENT);
        }

        console.log('after EmptyResponseInterceptor');

        return data;
      }),
    );
  }
}
