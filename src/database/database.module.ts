import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        type:
          config.database.type === 'sqlite'
            ? 'sqlite'
            : config.database.type === 'mysql'
              ? 'mysql'
              : 'postgres',
        host: config.database.host,
        port: config.database.port,
        database: config.database.name,
        user: config.database.user,
        password: config.database.password,
        autoLoadEntities: true,
        synchronize: !config.production,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
