import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

// package.json에 작성 된 typeorm-extension이 appConfigValidationSchema.module을 읽지 못하기 때문에 최상단에 작성 추가.
// dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
dotenvConfig();

const configService = new ConfigService();

export const options: DataSourceOptions = {
  type: 'mysql',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  database: configService.getOrThrow<string>('DB_NAME'),
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  // synchronize: configService.get<string>('NODE_ENV') === 'development', // 서버가 구동될 때, 테이블 자동생성
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
};

export const dataSource = new DataSource(options);
