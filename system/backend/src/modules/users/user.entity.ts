import { Entity, Hidden, Opt, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';
import { SimpleArrayType } from '../../common/types/simple-array.type';

/**
 * 사용자 (설계서 4장: OperatorUser/TenantUser 통합 User)
 * loginId 전역 유일. TENANT 는 tenantId 필수.
 */
@Entity({ tableName: 'app_user' })
@Unique({ name: 'IDX_9743fe7b06b84cbb004af835b0', properties: ['loginId'] })
export class User extends BaseEntity {
  @Property({ fieldName: 'login_id', length: 64 })
  loginId: string;

  @Property({ length: 100 })
  name: string;

  @Property({ length: 255, nullable: true })
  email: string | null = null;

  @Property({ length: 32, nullable: true })
  phone: string | null = null;

  /** OPERATOR(운영자) / TENANT(이용회사) */
  @Property({ fieldName: 'user_group', length: 16, default: 'TENANT' })
  userGroup: ('OPERATOR' | 'TENANT') & Opt = 'TENANT';

  @Property({ fieldName: 'tenant_id', length: 32, nullable: true })
  tenantId: string | null = null;

  /** ACTIVE / LOCKED / PASSWORD_EXPIRED / SUSPENDED / DORMANT / DISABLED */
  @Property({ length: 20, default: 'ACTIVE' })
  status: string & Opt = 'ACTIVE';

  /** 역할 코드 목록 (프레임워크 단계: simple-array, 이후 RoleAssignment 로 정규화) */
  @Property({ type: SimpleArrayType, default: '' })
  roles: string[] & Opt = [];

  @Property({ fieldName: 'password_hash', length: 255, nullable: true, hidden: true })
  passwordHash: Hidden<string> | null = null;

  @Property({ fieldName: 'last_login_at', columnType: 'timestamptz', nullable: true })
  lastLoginAt: Date | null = null;

  @Property({ fieldName: 'is_external_partner', default: false })
  isExternalPartner: boolean & Opt = false;

  /**
   * 확장 프로필 (설계 OP-06A UserDetail: 영문명, 사번, 조직, 부서, 직위, 주기장,
   * 알림채널, locale, timezone, 접근범위, 시작/종료일, 계정만료, 기본그룹/Role,
   * 권한만료, 저장사유, assignments[], history[] ...)
   * 정식 페이즈에서 UserDetail/RoleAssignment 테이블로 정규화한다.
   */
  @Property({ columnType: 'jsonb', nullable: true })
  detail: Record<string, unknown> | null = null;
}
