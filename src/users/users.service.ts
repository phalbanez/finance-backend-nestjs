import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/common/errors/unauthorized.error';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InactiveUserError } from './errors/inactive.user.error';
import { InvalidUserError } from './errors/invalid.user.error';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.login = createUserDto.login;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const userCreated = await this.repository.save(user);
    delete userCreated.password;

    return userCreated;
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async disable(id: number): Promise<void> {
    const user = await this.repository.findOne({
      select: { id: true, isActive: true },
      where: { id },
    });
    if (!user) throw new InvalidUserError();
    if (!user.isActive) return;
    user.isActive = false;
    await this.repository.save(user);
  }

  async login(login: string, password: string): Promise<LoginUserDto> {
    const user = await this.repository.findOne({
      select: { id: true, password: true, isActive: true },
      where: { login: login },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        if (!user.isActive) {
          throw new InactiveUserError();
        }

        return {
          id: user.id,
        };
      }
    }

    throw new UnauthorizedError();
  }

  async valid(id: number): Promise<void> {
    const user = await this.repository.findOne({
      select: { isActive: true },
      where: { id },
    });
    if (!user) throw new InactiveUserError();
    if (!user.isActive) throw new InactiveUserError();
  }
}
