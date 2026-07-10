import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 감사로그 (설계서 DataChangeLog / OperatorActivityLog 준거)
 * append-only: UPDATE/DELETE 금지, 해시체인으로 위변조 탐지.
 */
@Entity('audit_log')
@Index(['tenantId', 'createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'tenant_id', type: 'varchar', length: 32, nullable: true })
  tenantId: string | null;

  @Column({ name: 'user_id', type: 'varchar', length: 64, nullable: true })
  userId: string | null;

  @Column({ name: 'login_id', type: 'varchar', length: 64, nullable: true })
  loginId: string | null;

  @Column({ name: 'user_name', type: 'varchar', length: 100, nullable: true })
  userName: string | null;

  /** CREATE / UPDATE / DELETE / APPROVE / SUBMIT / EXPORT / LOGIN ... */
  @Column({ type: 'varchar', length: 32 })
  action: string;

  /** 자원/화면 식별 (MENU, USER, SA-JNL-01 ...) */
  @Column({ type: 'varchar', length: 64 })
  resource: string;

  @Column({ name: 'menu_code', type: 'varchar', length: 32, nullable: true })
  menuCode: string | null;

  @Column({ name: 'http_method', type: 'varchar', length: 8, nullable: true })
  httpMethod: string | null;

  @Column({ name: 'request_path', type: 'varchar', length: 255, nullable: true })
  requestPath: string | null;

  /** 변경 전 값 (JSON) */
  @Column({ name: 'before_data', type: 'jsonb', nullable: true })
  beforeData: Record<string, unknown> | null;

  /** 변경 후 값 (JSON) */
  @Column({ name: 'after_data', type: 'jsonb', nullable: true })
  afterData: Record<string, unknown> | null;

  @Column({ name: 'request_id', type: 'varchar', length: 64, nullable: true })
  requestId: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ip: string | null;

  @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
  userAgent: string | null;

  @Column({ type: 'varchar', length: 16, default: 'SUCCESS' })
  result: string;

  /** 해시체인: sha256(prevHash + 본문) — 위변조 탐지 */
  @Column({ name: 'prev_hash', type: 'varchar', length: 64, nullable: true })
  prevHash: string | null;

  @Column({ name: 'chain_hash', type: 'varchar', length: 64 })
  chainHash: string;
}
