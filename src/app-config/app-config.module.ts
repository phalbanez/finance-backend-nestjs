import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

const getEnvFilename = (): string => {
  if (
    process.env.NODE_ENV === undefined ||
    process.env.NODE_ENV === 'development'
  )
    return '.env.development.local';

  if (process.env.NODE_ENV === 'test') return '.env.test.local';

  if (process.env.NODE_ENV === 'production') return '.env';

  return '';
};

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: getEnvFilename(),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
