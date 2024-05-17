import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Sellmate WMS API' };
  }

  @Get('i18n')
  getHello() {
    return this.appService.getHello();
  }

  @Get('empty')
  getEmpty(): object | null {
    return this.appService.getEmpty();
  }
}
