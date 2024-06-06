import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from './config/app.config';
import { ThrottlerConfigService } from './config/throttler.config';
import { queueFactory } from './config/queue.config';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { i18nConfig } from './config/i18n.config';
import { BullModule } from '@nestjs/bull';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guard/custom-throttler/custom-throttler.guard';
import { TenantModule } from './modules/tenant/tenant.module';
import { SystemModule } from './modules/system/system.module';
import { TenancyModule } from './modules/tenant/tenancy.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    // 환경변수 유효성 검사
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 env 사용가능
      // envFilePath:
      //   process.env.NODE_ENV === 'development'
      //     ? '.env.development'
      //     : '.env.production',
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: validationSchema,
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
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    //   // imports: [ConfigModule.forRoot()],
    //   // useFactory: (configService: ConfigService) => ({
    //   //   type: 'mysql',
    //   //   host: configService.get<string>('DATABASE_HOST'),
    //   //   port: configService.get<number>('DATABASE_PORT'),
    //   //   username: configService.get<string>('DATABASE_USERNAME'),
    //   //   password: configService.get<string>('DATABASE_PASSWORD'),
    //   //   database: configService.get<string>('DATABASE_NAME'),
    //   //   retryAttempts: 2, // DB connection 시도 횟수
    //   //   entities: [],
    //   //   synchronize: false, // 서버가 구동될 떄, 테이블 자동생성
    //   //   logging: true,
    //   // }),
    //   // inject: [ConfigService],
    // }),
    // TypeOrmModule.forRootAsync({
    //   name: 'system', // default DB는 name 필요없음
    //   useClass: TypeOrmSystemConfigService,
    // }),
    // 국제화
    I18nModule.forRootAsync({
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      useFactory: i18nConfig,
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: queueFactory,
      inject: [ConfigService],
    }),
    TenancyModule,
    // Tenant
    TenantModule,
    // System
    SystemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
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
