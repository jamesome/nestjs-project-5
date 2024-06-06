import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Sellmate WMS API' };
  }
}
