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
    const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();
    console.log('\nStart LoggingInterceptor');
    console.log('request.method :: ' + request.method);
    console.log('request.url :: ' + request.url);
    console.log('request.body :: ');
    console.log(request.body);
    console.log('--------------------------');

    return next.handle().pipe(
      tap((data) => {
        console.log('response.header :: ');
        console.log('response.body :: ');
        console.log(JSON.stringify(data));
        console.log('End LoggingInterceptor\n');

        return data;
      }),
    );
  }
}
