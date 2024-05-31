import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { options } from './dataSource';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  ...options,
  seeds: ['./seeds/*{.ts,.js}'],
  seedTracking: false,
  factories: ['./factories/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

// runSeeders(dataSource);

export default dataSource;
