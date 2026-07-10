import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/** 로그인 이력 (설계서 LoginHistory) */
@Entity('login_history')
@Index(['loginId', 'createdAt'])
export class LoginHistory {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'user_id', type: 'varchar', length: 64, nullable: true })
  userId: string | null;

  @Column({ name: 'login_id', type: 'varchar', length: 64 })
  loginId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string | null;

  @Column({ name: 'tenant_id', type: 'varchar', length: 32, nullable: true })
  tenantId: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ip: string | null;

  @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
  userAgent: string | null;

  /** SUCCESS / FAILED / LOCKED / BYPASS(개발모드) */
  @Column({ type: 'varchar', length: 16 })
  result: string;

  @Column({ name: 'fail_reason', type: 'varchar', length: 100, nullable: true })
  failReason: string | null;
}
