import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { SecurityService } from '../security/security.service';
import { ErrorCodes } from '../../common/constants/error-codes';
import { AuthUser } from '../../common/decorators/current-user.decorator';

export interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    loginId: string;
    name: string;
    email: string | null;
    userGroup: string;
    tenantId: string | null;
    roles: string[];
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService,
  ) {}

  /**
   * 로그인.
   * AUTH_BYPASS=true(개발 모드)면 비밀번호 검증을 생략하고,
   * 존재하지 않는 loginId 는 TENANT 사용자로 자동 생성해 즉시 진입시킨다.
   * 운영 전환 시 .env 에서 AUTH_BYPASS=false 로 변경하면 bcrypt 검증이 활성화된다.
   */
  async login(loginId: string, password: string, meta: { ip?: string; userAgent?: string }): Promise<LoginResult> {
    const bypass = this.configService.get<boolean>('auth.bypass');

    let user = await this.usersService.findByLoginId(loginId);

    if (!user) {
      if (!bypass) {
        await this.recordLogin(loginId, null, meta, 'FAILED', '존재하지 않는 계정');
        throw new UnauthorizedException({
          code: ErrorCodes.AUTH_INVALID_CREDENTIALS,
          message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        });
      }
      user = await this.usersService.createIfAbsent({
        loginId,
        name: loginId,
        userGroup: 'TENANT',
        tenantId: 'T0001',
        status: 'ACTIVE',
        roles: ['TENANT_ADMIN'],
        source: 'DEV_AUTO',
      });
    }

    if (!bypass) {
      const withHash = await this.usersService.findByLoginId(loginId);
      const valid =
        withHash?.passwordHash && (await bcrypt.compare(password, withHash.passwordHash));
      if (!valid) {
        await this.recordLogin(loginId, user, meta, 'FAILED', '비밀번호 불일치');
        throw new UnauthorizedException({
          code: ErrorCodes.AUTH_INVALID_CREDENTIALS,
          message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        });
      }
    }

    await this.usersService.touchLastLogin(user.id);
    await this.recordLogin(loginId, user, meta, bypass ? 'BYPASS' : 'SUCCESS', null);

    const payload = {
      sub: user.id,
      loginId: user.loginId,
      name: user.name,
      userGroup: user.userGroup,
      tenantId: user.tenantId,
      roles: user.roles,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        loginId: user.loginId,
        name: user.name,
        email: user.email,
        userGroup: user.userGroup,
        tenantId: user.tenantId,
        roles: user.roles,
      },
    };
  }

  me(user: AuthUser) {
    return {
      id: user.userId,
      loginId: user.loginId,
      name: user.name,
      userGroup: user.userGroup,
      tenantId: user.tenantId,
      roles: user.roles,
    };
  }

  private recordLogin(
    loginId: string,
    user: { id: string; name: string; tenantId: string | null } | null,
    meta: { ip?: string; userAgent?: string },
    result: string,
    failReason: string | null,
  ) {
    return this.securityService.writeLoginHistory({
      loginId,
      userId: user?.id ?? null,
      name: user?.name ?? null,
      tenantId: user?.tenantId ?? null,
      ip: meta.ip ?? null,
      userAgent: meta.userAgent ?? null,
      result,
      failReason,
    });
  }
}
