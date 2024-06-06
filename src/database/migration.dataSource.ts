import { DataSource, DataSourceOptions } from 'typeorm';
import { options } from './dataSource';

const dataSourceOptions: DataSourceOptions = {
  ...options,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
