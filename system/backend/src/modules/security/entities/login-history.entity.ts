import { Entity, Index, Opt, PrimaryKey, Property } from '@mikro-orm/core';

/** 로그인 이력 (설계서 LoginHistory) */
@Entity({ tableName: 'login_history' })
@Index({ name: 'IDX_c5aa4ea03e1c3930670f4c911c', properties: ['loginId', 'createdAt'] })
export class LoginHistory {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id: string;

  @Property({ fieldName: 'created_at', columnType: 'timestamptz', defaultRaw: 'now()', onCreate: () => new Date() })
  createdAt: Date & Opt;

  @Property({ fieldName: 'user_id', length: 64, nullable: true })
  userId: string | null = null;

  @Property({ fieldName: 'login_id', length: 64 })
  loginId: string;

  @Property({ length: 100, nullable: true })
  name: string | null = null;

  @Property({ fieldName: 'tenant_id', length: 32, nullable: true })
  tenantId: string | null = null;

  @Property({ length: 64, nullable: true })
  ip: string | null = null;

  @Property({ fieldName: 'user_agent', length: 255, nullable: true })
  userAgent: string | null = null;

  /** SUCCESS / FAILED / LOCKED / BYPASS(개발모드) */
  @Property({ length: 16 })
  result: string;

  @Property({ fieldName: 'fail_reason', length: 100, nullable: true })
  failReason: string | null = null;
}
