import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { join } from 'path';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  // let app: INestApplication;
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Public
    app.useStaticAssets(join(__dirname, '../src/public'));
    app.setBaseViewsDir(join(__dirname, '../src/views'));

    // View
    app.setViewEngine('hbs');

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
