import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import Joi from 'joi';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path, { join } from 'path';

@Module({
  imports: [
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
      }),
      validationOptions: {
        abortEarly: false,
      },
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
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        // typesOutputPath: path.join(
        //   __dirname,
        //   '../src/generated/i18n.generated.ts',
        // ),
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
    WarehouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
