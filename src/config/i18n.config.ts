import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { I18nOptions } from 'nestjs-i18n';

export const i18nConfig = async (
  configService: ConfigService,
): Promise<I18nOptions> => {
  const currentDir = process.cwd(); // 현재 작업 디렉터리
  const config: I18nOptions = {
    fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
    loaderOptions: {
      path: join(currentDir, 'src/i18n/'),
      watch: true,
    },
    typesOutputPath: join(currentDir, 'src/generated/i18n.generated.ts'),
    logging: true,
  };

  // console.log('I18n Config:', config); // 디버깅을 위한 로그 추가

  return config;
};
