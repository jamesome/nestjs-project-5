import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// package.json에 작성 된 typeorm-extension이 appConfigValidationSchema.module을 읽지 못하기 때문에 최상단에 작성 추가.
config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();
console.log(__dirname);
export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow<string>('TENANT_DB_HOST'),
  port: configService.getOrThrow<number>('TENANT_DB_PORT'),
  database: configService.getOrThrow<string>('TENANT_DB_NAME'),
  username: configService.getOrThrow<string>('TENANT_DB_USERNAME'),
  password: configService.getOrThrow<string>('TENANT_DB_PASSWORD'),
  // synchronize: true, // 서버가 구동될 떄, 테이블 자동생성
  // logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*.js'], // '/../**/migrations/**' => (설정 시) Duplicate migrations 오류(두 번 돌아서 중복 오류)
  migrationsTableName: 'migrations',
});