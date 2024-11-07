import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(ip: string, login: string, password: string) {
    try {
      const user = await this.usersService.login(login, password);
      const payload = { sub: user.id, ip };
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        access_token: accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid login or password');
    }
  }
}
