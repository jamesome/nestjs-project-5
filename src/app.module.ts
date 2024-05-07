import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import path, { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ThrottlerConfigService } from './config/throttler.config';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import Joi from 'joi';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // 환경변수 유효성 검사
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 env 사용가능
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'test',
          'staging',
        ),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        FALLBACK_LANGUAGE: Joi.string().required(),
        THROTTLER_TTL: Joi.number().required(),
        THROTTLER_LIMIT: Joi.number().required(),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
    // Rate Limiting
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => [
      //   {
      //     // ttl초동안 최대 요청 개수 limit개로 제한
      //     ttl: configService.get<number>('THROTTLER_TTL'),
      //     limit: configService.get<number>('THROTTLER_LIMIT'),
      //   },
      // ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      // imports: [ConfigModule.forRoot()],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'mysql',
      //   host: configService.get<string>('DATABASE_HOST'),
      //   port: configService.get<number>('DATABASE_PORT'),
      //   username: configService.get<string>('DATABASE_USERNAME'),
      //   password: configService.get<string>('DATABASE_PASSWORD'),
      //   database: configService.get<string>('DATABASE_NAME'),
      //   retryAttempts: 2, // DB connection 시도 횟수
      //   entities: [],
      //   synchronize: false, // 서버가 구동될 떄, 테이블 자동생성
      //   logging: true,
      // }),
      // inject: [ConfigService],
    }),
    // 국제화
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: path.join(
          __dirname,
          '../src/generated/i18n.generated.ts',
        ),
      }),
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    // 추가 모듈들
    WarehouseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
