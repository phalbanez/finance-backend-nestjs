import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Ip() ip: string, @Body() signInDto: SignInDto) {
    return this.authService.signIn(ip, signInDto.login, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    const teste = '';
    return req.login;
  }
}