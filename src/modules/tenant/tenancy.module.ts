import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Request } from 'express';
import { options } from 'src/database/dataSource';
import { config as dotenvConfig } from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenvConfig();

const configService = new ConfigService();

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    const database = request.params.domain;

    if (!database) {
      return null;
    }

    // MysqlConnectionCredentialsOptions
    const dataSourceOptions = {
      ...options,
      database,
      entities: ['dist/modules/**/**/**/entities/*.entity{.ts,.js}'],
      extra: {
        maxIdle: configService.getOrThrow<string>('MAXIDLE'),
        idleTimeout: configService.getOrThrow<string>('IDLETIMEOUT'),
      },
    };

    const dataSource = new DataSource(dataSourceOptions as DataSourceOptions);
    return await dataSource.initialize();
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
