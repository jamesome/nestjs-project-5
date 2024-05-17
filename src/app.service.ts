import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from './generated/i18n.generated';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  async getHello(): Promise<string> {
    return await this.i18n.t('test.HELLO');
  }

  async getEmpty(): Promise<string | null> {
    return await null;
  }
}
