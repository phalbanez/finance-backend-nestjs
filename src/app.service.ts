import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';

@Injectable()
export class AppService {
  constructor(private readonly appConfig: AppConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
