import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    const configService = new ConfigService();
    const database = request.domain;

    if (!database) {
      return null;
    }

    // MysqlConnectionCredentialsOptions
    const dataSourceOptions: DataSourceOptions = {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database,
      synchronize: false,
      logging: configService.get<string>('NODE_ENV') === 'development',
      entities: ['dist/modules/**/**/**/entities/*.entity{.ts,.js}'],
    };

    const dataSource = new DataSource(dataSourceOptions);
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
