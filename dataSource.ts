import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

// package.json에 작성 된 typeorm-extension이 appConfigValidationSchema.module을 읽지 못하기 때문에 최상단에 작성 추가.
// dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
dotenvConfig({ path: `.env.development` });

const configService = new ConfigService();
console.log(__dirname + '/src/modules/../../**/');
export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow<string>('TENANT_DB_HOST'),
  port: configService.getOrThrow<number>('TENANT_DB_PORT'),
  database: configService.getOrThrow<string>('TENANT_DB_NAME'),
  entities: ['dist/modules/**/**/**/entities/*.entity{.ts,.js}'],
  password: configService.getOrThrow<string>('TENANT_DB_PASSWORD'),
  // synchronize: configService.get<string>('NODE_ENV') === 'development', // 서버가 구동될 떄, 테이블 자동생성
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
  // entities: [__dirname + '/src/modules/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migration/*{.ts,.js}'], // '/../**/migrations/**' => (설정 시) Duplicate migrations 오류(두 번 돌아서 중복 오류)
  // migrations: ['/src/database/migration/*.ts'],
  migrationsTableName: 'migrations',
});
