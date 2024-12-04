import { AppConfigService } from 'src/app-config/app-config.service';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (
  config: AppConfigService,
): DataSourceOptions => {
  return {
    type:
      config.database.type === 'sqlite'
        ? 'sqlite'
        : config.database.type === 'mysql'
          ? 'mysql'
          : 'postgres',
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    username: config.database.user,
    password: config.database.password,
    synchronize: !config.production,
  };
};
