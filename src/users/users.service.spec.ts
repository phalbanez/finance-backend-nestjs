import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

const userArray = [
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

const password = 'teste123';
const oneUser = userArray[0];
const createUser = { id: undefined, ...oneUser, password };
const passwordHash = bcrypt.hashSync(createUser.password, 10);
const authUser = { ...oneUser, password: passwordHash };

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            findOne: jest.fn().mockResolvedValue(authUser),
            save: jest.fn().mockResolvedValue(createUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const user = await service.create(createUser);
      expect(user).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove(2);
      expect(removeSpy).toHaveBeenCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should login with the username and password provided', async () => {
      const userLogged = await service.login(oneUser.login, password);
      expect(userLogged).toEqual({ id: 1 });
    });

    it('valid login and user', async () => {
      await service.validLogin(1);
    });
  });
});
