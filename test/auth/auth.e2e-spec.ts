import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConfigModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { runUserSeeds } from 'test/users/users.seeds';

describe('Auth JWT - /auth (e2e)', () => {
  let app: INestApplication;
  let service: UsersService;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [DatabaseConfigModule, AuthModule, UsersModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();

    await runUserSeeds(app);
  });

  it('should fail with invalid login', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'login1', password: 'teste' })
      .expect(401);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'login2', password: 'teste234' })
      .expect(401);
  });

  it('should get a JWT then successfully make a call', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'login1', password: 'teste123' })
      .expect(200);

    const token = response.body.access_token;
    // console.log(token);
    await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.sub).toEqual(1);
      });
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});
