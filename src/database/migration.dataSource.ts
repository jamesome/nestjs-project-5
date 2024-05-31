import { DataSource, DataSourceOptions } from 'typeorm';
import { options } from './dataSource';

const dataSourceOptions: DataSourceOptions = {
  ...options,
  migrations: ['./migration/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
