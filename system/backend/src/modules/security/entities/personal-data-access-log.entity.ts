import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 개인정보 접근로그 (설계서 PersonalDataAccessLog)
 * 개인정보 조회·복호화·다운로드 시 사용자/시각/대상/항목/목적/건수를 기록. append-only.
 */
@Entity('personal_data_access_log')
@Index(['tenantId', 'createdAt'])
export class PersonalDataAccessLog {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'tenant_id', type: 'varchar', length: 32, nullable: true })
  tenantId: string | null;

  @Column({ name: 'user_id', type: 'varchar', length: 64 })
  userId: string;

  @Column({ name: 'login_id', type: 'varchar', length: 64 })
  loginId: string;

  @Column({ name: 'user_name', type: 'varchar', length: 100, nullable: true })
  userName: string | null;

  /** 접근 대상 유형 (EMPLOYEE / PARTNER / USER ...) */
  @Column({ name: 'target_type', type: 'varchar', length: 32 })
  targetType: string;

  @Column({ name: 'target_id', type: 'varchar', length: 64, nullable: true })
  targetId: string | null;

  @Column({ name: 'target_name', type: 'varchar', length: 100, nullable: true })
  targetName: string | null;

  /** 접근한 개인정보 항목 (예: ['phone','email','rrn']) */
  @Column({ name: 'data_items', type: 'jsonb' })
  dataItems: string[];

  /** VIEW_MASKED / VIEW_PLAIN(평문조회) / DECRYPT / DOWNLOAD / PRINT */
  @Column({ name: 'access_type', type: 'varchar', length: 32 })
  accessType: string;

  /** 평문 조회 시 필수 입력되는 조회 사유 */
  @Column({ type: 'varchar', length: 500, nullable: true })
  purpose: string | null;

  @Column({ name: 'record_count', type: 'int', default: 1 })
  recordCount: number;

  @Column({ name: 'request_id', type: 'varchar', length: 64, nullable: true })
  requestId: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ip: string | null;
}
