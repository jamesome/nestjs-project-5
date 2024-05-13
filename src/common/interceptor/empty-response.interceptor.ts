import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before EmptyResponseInterceptor');

    return next.handle().pipe(
      map((data) => {
        console.log('EmptyResponseInterceptor :: ' + data);
        if (!data || data.length === 0) {
          console.log('EmptyResponseInterceptor :: herrrrrrre');
          throw new HttpException('Not', HttpStatus.NO_CONTENT);
        }

        console.log('after EmptyResponseInterceptor');

        return data;
      }),
    );
  }
}
