import { Entity, Index, Opt, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * 감사로그 (설계서 DataChangeLog / OperatorActivityLog 준거)
 * append-only: UPDATE/DELETE 금지, 해시체인으로 위변조 탐지.
 */
@Entity({ tableName: 'audit_log' })
@Index({ name: 'IDX_14bcaa576c86e805b158f293f7', properties: ['tenantId', 'createdAt'] })
export class AuditLog {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id: string;

  @Property({ fieldName: 'created_at', columnType: 'timestamptz', defaultRaw: 'now()', onCreate: () => new Date() })
  createdAt: Date & Opt;

  @Property({ fieldName: 'tenant_id', length: 32, nullable: true })
  tenantId: string | null = null;

  @Property({ fieldName: 'user_id', length: 64, nullable: true })
  userId: string | null = null;

  @Property({ fieldName: 'login_id', length: 64, nullable: true })
  loginId: string | null = null;

  @Property({ fieldName: 'user_name', length: 100, nullable: true })
  userName: string | null = null;

  /** CREATE / UPDATE / DELETE / APPROVE / SUBMIT / EXPORT / LOGIN ... */
  @Property({ length: 32 })
  action: string;

  /** 자원/화면 식별 (MENU, USER, SA-JNL-01 ...) */
  @Property({ length: 64 })
  resource: string;

  @Property({ fieldName: 'menu_code', length: 32, nullable: true })
  menuCode: string | null = null;

  @Property({ fieldName: 'http_method', length: 8, nullable: true })
  httpMethod: string | null = null;

  @Property({ fieldName: 'request_path', length: 255, nullable: true })
  requestPath: string | null = null;

  /** 변경 전 값 (JSON) */
  @Property({ fieldName: 'before_data', columnType: 'jsonb', nullable: true })
  beforeData: Record<string, unknown> | null = null;

  /** 변경 후 값 (JSON) */
  @Property({ fieldName: 'after_data', columnType: 'jsonb', nullable: true })
  afterData: Record<string, unknown> | null = null;

  @Property({ fieldName: 'request_id', length: 64, nullable: true })
  requestId: string | null = null;

  @Property({ length: 64, nullable: true })
  ip: string | null = null;

  @Property({ fieldName: 'user_agent', length: 255, nullable: true })
  userAgent: string | null = null;

  @Property({ length: 16, default: 'SUCCESS' })
  result: string & Opt = 'SUCCESS';

  /** 해시체인: sha256(prevHash + 본문) — 위변조 탐지 */
  @Property({ fieldName: 'prev_hash', length: 64, nullable: true })
  prevHash: string | null = null;

  @Property({ fieldName: 'chain_hash', length: 64 })
  chainHash: string;
}
