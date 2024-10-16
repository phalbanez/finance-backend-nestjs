import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfigModule } from './database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
