import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigDto } from './dto/database-config.dto';
import { JwtConfigDto } from './dto/jwt-config.dto';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  readonly development = process.env.NODE_ENV === 'development';

  readonly test = process.env.NODE_ENV === 'test';

  readonly production = process.env.NODE_ENV === 'production';

  get jwt(): JwtConfigDto {
    return {
      secret: this.config.getOrThrow<string>('JWT_SECRET'),
      expiration: this.config.getOrThrow<string>('JWT_EXPIRATION_TIME'),
    };
  }

  get database(): DatabaseConfigDto {
    return {
      type: this.config.getOrThrow<string>('DB_TYPE'),
      host: this.config.getOrThrow<string>('DB_HOST'),
      name: this.config.getOrThrow<string>('DB_NAME'),
      port: this.config.getOrThrow<number>('DB_PORT'),
      user: this.config.getOrThrow<string>('DB_USER'),
      password: this.config.getOrThrow<string>('DB_PASSWORD'),
    };
  }
}
