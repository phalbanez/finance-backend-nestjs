import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AppConfigModule, DatabaseConfigModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
