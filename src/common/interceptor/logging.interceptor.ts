import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    console.log('before intercept');
    console.log(method, url, body);

    return next
      .handle()
      .pipe(tap((data) => console.log(data + ' after intercept')));
  }
}
