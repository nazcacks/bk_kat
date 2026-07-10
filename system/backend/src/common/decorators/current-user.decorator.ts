import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  userId: string;
  loginId: string;
  name: string;
  userGroup: 'OPERATOR' | 'TENANT';
  tenantId: string | null;
  roles: string[];
}

/** 컨트롤러에서 인증 사용자 주입: @CurrentUser() user: AuthUser */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
