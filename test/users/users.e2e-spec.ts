import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppConfigModule } from '../../src/app-config/app-config.module';
import { AppConfigService } from '../../src/app-config/app-config.service';
import { UsersModule } from '../../src/users/users.module';

describe('Users - /users (e2e)', () => {
  const users = [
    {
      id: 1,
      login: 'login1',
      name: 'User 1',
      email: 'user1@test.com',
      isActive: true,
    },
    {
      id: 2,
      login: 'login2',
      name: 'User 2',
      email: 'user2@test.com',
      isActive: true,
    },
  ];

  const user1 = { ...users[0] };
  const user2 = { ...users[1] };

  const createUser1 = { ...user1, password: 'teste123' };
  delete createUser1.id;

  const createUser2 = { ...user2, password: 'teste12345' };
  delete createUser2.id;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          useFactory: (config: AppConfigService) => ({
            type:
              config.database.type === 'sqlite'
                ? 'sqlite'
                : config.database.type === 'mysql'
                  ? 'mysql'
                  : 'postgres',
            host: config.database.host,
            port: config.database.port,
            database: config.database.name,
            user: config.database.user,
            password: config.database.password,
            autoLoadEntities: true,
            synchronize: true,
          }),
          inject: [AppConfigService],
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', async () => {
    const { body: body1 } = await request(app.getHttpServer())
      .post('/users')
      .send({ ...createUser1 })
      .expect(201);
    expect(body1).toEqual(user1);

    const { body: body2 } = await request(app.getHttpServer())
      .post('/users')
      .send({ ...createUser2 })
      .expect(201);
    expect(body2).toEqual(user2);
  });

  it('Get all users [GET /users]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(body).toEqual(users);
  });

  it('Get one user [GET /users/:id]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/1')
      .expect(200);
    expect(body).toEqual(user1);
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});