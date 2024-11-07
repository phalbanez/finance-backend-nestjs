import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth JWT - /auth (e2e)', () => {
  let app: INestApplication;
  let service: UsersService;

  const user1 = {
    id: 1,
    login: 'login1',
    name: 'User 1',
    email: 'user1@test.com',
    password: 'teste123',
    isActive: true,
  };

  const user2 = {
    id: 2,
    login: 'login2',
    name: 'User 2',
    email: 'user2@test.com',
    password: 'teste123456',
    isActive: true,
  };

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();

    service = app.get<UsersService>(UsersService);
    await service.create(user1);
    await service.create(user2);
    await service.disable(2);
  });

  it('should fail with invalid login', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'login1', password: 'teste' })
      .expect(401);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'login2', password: 'teste123456' })
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
    await app.close();
  });
});
