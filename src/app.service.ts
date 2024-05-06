import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from './generated/i18n.generated';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  private readonly logger = new Logger(AppService.name);

  // async getHello(): Promise<string> {
  //   return await this.i18n.t('test.HELLO');
  // }

  // async getHelloId(id: number): Promise<object> {
  //   return [];
  // }
}
