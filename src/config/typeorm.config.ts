import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('TENANT_DB_HOST'),
      port: this.configService.get<number>('TENANT_DB_PORT'),
      username: this.configService.get<string>('TENANT_DB_USERNAME'),
      password: this.configService.get<string>('TENANT_DB_PASSWORD'),
      database: this.configService.get<string>('TENANT_DB_NAME'),
      retryAttempts: 2, // DB connection 시도 횟수
      synchronize: this.configService.get<string>('NODE_ENV') === 'development', // 서버가 구동될 떄, 테이블 자동생성
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 스키마 동기화. 테이블을 Drop 하고 Create 하는 방식. 데이터 보존 불가(develop환경에서만 사용!)
    };
  }
}
