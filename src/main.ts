import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ThrottlerExceptionFilter } from './common/filter/throtter-exception.filter';
import { EmptyResponseInterceptor } from './common/interceptor/empty-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
declare const module: any;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Interceptor
  app.useGlobalInterceptors(new EmptyResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // Serializer 글로벌 적용

  // Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ThrottlerExceptionFilter());

  // Public
  app.useStaticAssets(join(__dirname, '../src/public'));
  app.setBaseViewsDir(join(__dirname, '../src/views'));

  // View
  app.setViewEngine('hbs');

  // Versioning
  app.enableVersioning({ type: VersioningType.URI });

  // Compression => 왜 안되지??
  // app.use(compression());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('WMS Application')
    .setDescription('The WMS API description')
    .setVersion('1.0')
    .addTag('wms')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.PORT);
}
bootstrap();
