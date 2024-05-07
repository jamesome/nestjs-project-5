import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { EmptyResponseInterceptor } from './common/interceptor/empty-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
declare const module: any;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Interceptor
  app.useGlobalInterceptors(new EmptyResponseInterceptor());

  // Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Public
  app.useStaticAssets(join(__dirname, '../src/public'));
  app.setBaseViewsDir(join(__dirname, '../src/views'));

  // View
  app.setViewEngine('hbs');

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
