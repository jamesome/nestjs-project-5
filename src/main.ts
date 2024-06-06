import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerExceptionFilter } from './common/filters/throtter-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { I18nValidationPipe } from 'nestjs-i18n';
// import * as compression from 'compression';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { useContainer } from 'class-validator';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
// import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.spec';
// import { ValidationError } from 'class-validator';
declare const module: any;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 써드파티 앱의 의존성을 Nest 컨테이너가 하도록
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Interceptor
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)), // Serializer 글로벌 적용
    // new TransformResponseInterceptor(),
  );

  // Pipe
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Filter
  app.useGlobalFilters(
    new ThrottlerExceptionFilter(),
    new DatabaseExceptionFilter(),
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  // Public
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // View
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Template engine
  app.setViewEngine('hbs');

  // Versioning
  app.enableVersioning({ type: VersioningType.URI });

  // Compression => 왜 안되지??
  // app.use(compression());

  // Swagger
  setupSwagger(app);

  // HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.APP_PORT ?? 3100);
}
bootstrap();
