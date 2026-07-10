import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ErrorCodes } from '../constants/error-codes';
import { AuthUser } from '../decorators/current-user.decorator';

/**
 * 전역 인증 가드.
 * - @Public() 엔드포인트는 통과
 * - Bearer 토큰이 있으면 검증 후 req.user 주입
 * - AUTH_BYPASS=true(개발 모드)에서는 토큰이 없어도 개발 사용자로 통과
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req.headers?.authorization);

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('auth.jwtSecret'),
        });
        req.user = {
          userId: String(payload.sub),
          loginId: payload.loginId,
          name: payload.name,
          userGroup: payload.userGroup,
          tenantId: payload.tenantId ?? null,
          roles: payload.roles ?? [],
        } satisfies AuthUser;
        return true;
      } catch {
        throw new UnauthorizedException({
          code: ErrorCodes.AUTH_INVALID_TOKEN,
          message: '유효하지 않은 인증 토큰입니다.',
        });
      }
    }

    if (this.configService.get<boolean>('auth.bypass')) {
      req.user = {
        userId: '0',
        loginId: 'dev',
        name: '개발사용자',
        userGroup: 'TENANT',
        tenantId: 'T0001',
        roles: ['TENANT_ADMIN'],
      } satisfies AuthUser;
      return true;
    }

    throw new UnauthorizedException({
      code: ErrorCodes.AUTH_REQUIRED,
      message: '인증이 필요합니다.',
    });
  }

  private extractToken(header?: string): string | null {
    if (!header) return null;
    const [type, token] = header.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}
