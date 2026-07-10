import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AUDIT_KEY, AuditMeta } from '../decorators/audit.decorator';
import { SecurityService } from '../../modules/security/security.service';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * 감사로그 인터셉터.
 * @Audit 데코레이터가 붙은 핸들러, 또는 데이터 변경(HTTP POST/PUT/PATCH/DELETE) 호출이
 * 성공하면 append-only 감사로그(해시체인)에 기록한다.
 */
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly securityService: SecurityService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const meta = this.reflector.get<AuditMeta | undefined>(AUDIT_KEY, context.getHandler());

    const shouldAudit = meta || MUTATING_METHODS.has(req.method);
    if (!shouldAudit) return next.handle();

    // 감사 대상이 아닌 인증 요청(로그인)은 LoginHistory 로 별도 기록되므로 제외
    if (req.path?.startsWith('/api/auth/login')) return next.handle();

    return next.handle().pipe(
      tap((result) => {
        const user = req.user;
        void this.securityService.writeAuditLog({
          tenantId: user?.tenantId ?? req.tenantIdHeader ?? null,
          userId: user?.userId ?? null,
          loginId: user?.loginId ?? null,
          userName: user?.name ?? null,
          action: meta?.action ?? req.method,
          resource: meta?.resource ?? this.resourceFromPath(req.path),
          httpMethod: req.method,
          requestPath: req.path,
          beforeData: null,
          afterData: this.safeBody(req.body),
          requestId: req.requestId ?? null,
          ip: req.ip ?? null,
          userAgent: (req.headers?.['user-agent'] as string) ?? null,
          result: 'SUCCESS',
        });
        void result;
      }),
    );
  }

  private resourceFromPath(path: string): string {
    const seg = (path ?? '').replace(/^\/api\//, '').split('/');
    return (seg[0] ?? 'UNKNOWN').toUpperCase();
  }

  /** 비밀번호 등 시크릿은 감사로그에 평문 기록 금지 (설계서: 로그 PII/시크릿 금지) */
  private safeBody(body: unknown): Record<string, unknown> | null {
    if (!body || typeof body !== 'object') return null;
    const clone: Record<string, unknown> = { ...(body as Record<string, unknown>) };
    for (const key of Object.keys(clone)) {
      if (/password|secret|token|rrn|residentNo/i.test(key)) clone[key] = '***';
    }
    return clone;
  }
}
