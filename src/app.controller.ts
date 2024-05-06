import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello(): Promise<string> {
  //   console.log('controller');
  //   return await this.appService.getHello();
  // }

  // @Get(':id')
  // async getHelloId(@Param('id') id: string): Promise<object> {
  //   console.log('controller');
  //   return await this.appService.getHelloId(+id);
  // }
}
