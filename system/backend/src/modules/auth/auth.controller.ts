import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';

class LoginDto {
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @IsOptional()
  @IsString()
  password: string = '';
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto.loginId, dto.password, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.authService.me(user);
  }
}
