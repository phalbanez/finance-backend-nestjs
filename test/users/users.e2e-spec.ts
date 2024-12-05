import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConfigModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import * as request from 'supertest';
import { runUserSeeds, usersSeed } from './users.seeds';

describe('Users - /users (e2e)', () => {
  const user = {
    id: 0,
    login: 'login4',
    name: 'User 4',
    email: 'user4@test.com',
    isActive: true,
  };

  const createUser = { ...user, password: 'teste123' };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseConfigModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await runUserSeeds(app);
  });

  it('Get all users [GET /users]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK);

    expect(body).toEqual(usersSeed);
  });

  it('Create [POST /users]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users')
      .send({ ...createUser })
      .expect(HttpStatus.CREATED);

    user.id = body.id;
    expect(body).toEqual(user);
  });

  it('Get one user [GET /users/:id]', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(HttpStatus.OK);
    expect(body).toEqual(user);
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});
