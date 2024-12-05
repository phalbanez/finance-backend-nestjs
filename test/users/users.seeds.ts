import { INestApplication } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export const usersSeed = [
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
    isActive: false,
  },
  {
    id: 3,
    login: 'login2',
    name: 'User 2',
    email: 'user2@test.com',
    isActive: true,
  },
];

export const userSeed1 = { ...usersSeed[0] };
export const userSeed2 = { ...usersSeed[1] };
export const userSeed3 = { ...usersSeed[1] };

export const runUserSeeds = async (
  app: INestApplication<any>,
): Promise<void> => {
  const createUser1 = { ...userSeed1, password: 'teste123' };
  const createUser2 = { ...userSeed2, password: 'teste234' };
  const createUser3 = { ...userSeed3, password: 'teste345' };

  // const repository = app.get<Repository<User>>(getRepositoryToken(User));
  // await repository.insert(createUser1);

  const service = app.get<UsersService>(UsersService);
  await service.create(createUser1);
  await service.create(createUser2);
  await service.create(createUser3);
  await service.disable(2);
};
