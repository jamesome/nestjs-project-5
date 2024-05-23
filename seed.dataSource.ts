import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { SeederOptions, runSeeders } from 'typeorm-extension';

// package.json에 작성 된 typeorm-extension이 appConfigValidationSchema.module을 읽지 못하기 때문에 최상단에 작성 추가.
// dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
dotenvConfig({ path: `.env.development` });

const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: configService.getOrThrow<string>('TENANT_DB_HOST'),
  port: configService.getOrThrow<number>('TENANT_DB_PORT'),
  database: configService.getOrThrow<string>('TENANT_DB_NAME'),
  entities: ['src/modules/**/**/**/entities/*.entity{.ts,.js}'],
  username: configService.getOrThrow<string>('TENANT_DB_USERNAME'),
  password: configService.getOrThrow<string>('TENANT_DB_PASSWORD'),
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
  seeds: ['src/database/seeds/*{.ts,.js}'],
  seedTracking: false,
  factories: ['src/database/factories/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

runSeeders(dataSource);

export default dataSource;
