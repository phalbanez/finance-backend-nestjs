import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from './app-config.module';
import { AppConfigService } from './app-config.service';
import { DatabaseConfigDto } from './dto/database-config.dto';
import { JwtConfigDto } from './dto/jwt-config.dto';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('service.jwt should be equal to JwtConfigDto and valid', () => {
    const jwtConfig: JwtConfigDto = {
      secret: '',
      expiration: '',
    };

    expect(Object.keys(service.jwt)).toEqual(Object.keys(jwtConfig));
    expect(service.jwt.secret.length).toBeGreaterThanOrEqual(30);
  });

  it('service.database should be equal to DatabaseConfigDto', () => {
    const databaseConfig: DatabaseConfigDto = {
      type: '',
      host: '',
      name: '',
      port: 0,
      user: '',
      password: '',
    };

    expect(Object.keys(service.database)).toEqual(Object.keys(databaseConfig));
  });
});
