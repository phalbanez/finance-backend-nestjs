import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        ...dataSourceOptions(config),
        autoLoadEntities: true,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
