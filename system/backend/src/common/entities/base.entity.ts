import { Opt, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * 공통 감사 필드 (설계서 12.3 테이블 공통 제약)
 * created_at/by, updated_at/by, version, source
 */
export abstract class BaseEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id: string;

  @Property({
    fieldName: 'created_at',
    columnType: 'timestamptz',
    defaultRaw: 'now()',
    onCreate: () => new Date(),
  })
  createdAt: Date & Opt;

  @Property({ fieldName: 'created_by', length: 64, nullable: true })
  createdBy: string | null = null;

  @Property({
    fieldName: 'updated_at',
    columnType: 'timestamptz',
    defaultRaw: 'now()',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date & Opt;

  @Property({ fieldName: 'updated_by', length: 64, nullable: true })
  updatedBy: string | null = null;

  @Property({ version: true })
  version: number & Opt = 1;

  @Property({ length: 32, default: 'UI' })
  source: string & Opt = 'UI';
}

/**
 * 테넌트 데이터 공통 (모든 이용회사 데이터는 tenant_id NOT NULL — 설계서 멀티테넌시 원칙)
 */
export abstract class TenantBaseEntity extends BaseEntity {
  @Property({ fieldName: 'tenant_id', length: 32 })
  tenantId: string;
}
