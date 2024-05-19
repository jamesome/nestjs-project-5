import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: configService.get<string>('TENANT_DB_HOST'),
    port: configService.get<number>('TENANT_DB_PORT'),
    username: configService.get<string>('TENANT_DB_USERNAME'),
    password: configService.get<string>('TENANT_DB_PASSWORD'),
    entities: ['dist/modules/**/**/**/entities/*.entity{.ts,.js}'],
    synchronize: false,
    logging: configService.get<string>('NODE_ENV') === 'development',
    autoLoadEntities: true,
  };
}
