import { Entity, Index, Opt, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * 개인정보 접근로그 (설계서 PersonalDataAccessLog)
 * 개인정보 조회·복호화·다운로드 시 사용자/시각/대상/항목/목적/건수를 기록. append-only.
 */
@Entity({ tableName: 'personal_data_access_log' })
@Index({ name: 'IDX_f61aa7ef8c871ddcd1ecd5aef1', properties: ['tenantId', 'createdAt'] })
export class PersonalDataAccessLog {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id: string;

  @Property({ fieldName: 'created_at', columnType: 'timestamptz', defaultRaw: 'now()', onCreate: () => new Date() })
  createdAt: Date & Opt;

  @Property({ fieldName: 'tenant_id', length: 32, nullable: true })
  tenantId: string | null = null;

  @Property({ fieldName: 'user_id', length: 64 })
  userId: string;

  @Property({ fieldName: 'login_id', length: 64 })
  loginId: string;

  @Property({ fieldName: 'user_name', length: 100, nullable: true })
  userName: string | null = null;

  /** 접근 대상 유형 (EMPLOYEE / PARTNER / USER ...) */
  @Property({ fieldName: 'target_type', length: 32 })
  targetType: string;

  @Property({ fieldName: 'target_id', length: 64, nullable: true })
  targetId: string | null = null;

  @Property({ fieldName: 'target_name', length: 100, nullable: true })
  targetName: string | null = null;

  /** 접근한 개인정보 항목 (예: ['phone','email','rrn']) */
  @Property({ fieldName: 'data_items', columnType: 'jsonb' })
  dataItems: string[];

  /** VIEW_MASKED / VIEW_PLAIN(평문조회) / DECRYPT / DOWNLOAD / PRINT */
  @Property({ fieldName: 'access_type', length: 32 })
  accessType: string;

  /** 평문 조회 시 필수 입력되는 조회 사유 */
  @Property({ length: 500, nullable: true })
  purpose: string | null = null;

  @Property({ fieldName: 'record_count', columnType: 'int', default: 1 })
  recordCount: number & Opt = 1;

  @Property({ fieldName: 'request_id', length: 64, nullable: true })
  requestId: string | null = null;

  @Property({ length: 64, nullable: true })
  ip: string | null = null;
}
