import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import path, { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerConfigService } from './config/throttler.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { TypeOrmSystemConfigService } from './config/typeorm.system.config';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guard/custom-throttler/custom-throttler.guard';
import Joi from 'joi';
import { TenantModuleModule } from './common/tenant-module.module';
import { SystemModuleModule } from './common/system-module.module';

@Module({
  imports: [
    // 환경변수 유효성 검사
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 env 사용가능
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'local',
          'test',
          'staging',
        ),
        TENANT_DB_HOST: Joi.string().required(),
        TENANT_DB_PORT: Joi.number().required(),
        TENANT_DB_USERNAME: Joi.string().required(),
        TENANT_DB_PASSWORD: Joi.string().required(),
        TENANT_DB_NAME: Joi.string().required(),
        FALLBACK_LANGUAGE: Joi.string().required(),
        THROTTLE_TTL: Joi.number().required(),
        THROTTLE_LIMIT: Joi.number().required(),
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
    TypeOrmModule.forRootAsync({
      name: 'system', // default DB는 name 필요없음
      useClass: TypeOrmSystemConfigService,
    }),
    // 국제화 TODO: config로 분리
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
    // Tenant
    TenantModuleModule,
    // System
    SystemModuleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
