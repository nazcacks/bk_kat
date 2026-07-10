import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
} from 'typeorm';

/**
 * 공통 감사 필드 (설계서 12.3 테이블 공통 제약)
 * created_at/by, updated_at/by, version, source
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 64, nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'varchar', length: 64, nullable: true })
  updatedBy: string | null;

  @VersionColumn({ name: 'version' })
  version: number;

  @Column({ name: 'source', type: 'varchar', length: 32, default: 'UI' })
  source: string;
}

/**
 * 테넌트 데이터 공통 (모든 이용회사 데이터는 tenant_id NOT NULL — 설계서 멀티테넌시 원칙)
 */
export abstract class TenantBaseEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 32 })
  tenantId: string;
}
