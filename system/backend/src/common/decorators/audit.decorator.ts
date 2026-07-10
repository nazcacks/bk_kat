import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export interface AuditMeta {
  /** 자원/화면 식별 (예: 'MENU', 'USER', 'SA-JNL-01') */
  resource: string;
  /** 행위 (CREATE/UPDATE/DELETE/APPROVE/CLOSE/SUBMIT/EXPORT ...) */
  action: string;
}

/**
 * 감사로그 대상 표시. AuditLogInterceptor 가 성공한 호출을
 * append-only 감사로그(해시체인)에 기록한다.
 */
export const Audit = (resource: string, action: string) =>
  SetMetadata(AUDIT_KEY, { resource, action } as AuditMeta);
