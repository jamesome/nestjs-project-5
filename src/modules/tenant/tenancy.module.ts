import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
// import { WarehouseV1 } from './warehouse/v1/entities/warehouse-v1.entity';

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    // console.log(request);
    const database = request.domain;
    const configService = new ConfigService();

    if (database) {
      const typeOrmConfig = {
        type: 'mysql',
        host: configService.get<string>('TENANT_DB_HOST'),
        port: configService.get<number>('TENANT_DB_PORT'),
        username: configService.get<string>('TENANT_DB_USERNAME'),
        password: configService.get<string>('TENANT_DB_PASSWORD'),
        retryAttempts: 2, // DB connection 시도 횟수
        logging: configService.get<string>('NODE_ENV') === 'development',
        entities: ['dist/modules/**/**/**/entities/*.entity{.ts,.js}'],
        // entities: [WarehouseV1],
        autoLoadEntities: false, // 스키마 동기화. 테이블을 Drop 하고 Create 하는 방식. 데이터 보존 불가(develop환경에서만 사용!)
      };

      return new DataSource({
        ...(typeOrmConfig as MysqlConnectionOptions),
        database,
      });
    }

    return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
