import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/**
 * 사용자 (설계서 4장: OperatorUser/TenantUser 통합 User)
 * loginId 전역 유일. TENANT 는 tenantId 필수.
 */
@Entity('app_user')
@Index(['loginId'], { unique: true })
export class User extends BaseEntity {
  @Column({ name: 'login_id', type: 'varchar', length: 64 })
  loginId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone: string | null;

  /** OPERATOR(운영자) / TENANT(이용회사) */
  @Column({ name: 'user_group', type: 'varchar', length: 16, default: 'TENANT' })
  userGroup: 'OPERATOR' | 'TENANT';

  @Column({ name: 'tenant_id', type: 'varchar', length: 32, nullable: true })
  tenantId: string | null;

  /** ACTIVE / LOCKED / PASSWORD_EXPIRED / SUSPENDED / DORMANT / DISABLED */
  @Column({ type: 'varchar', length: 20, default: 'ACTIVE' })
  status: string;

  /** 역할 코드 목록 (프레임워크 단계: simple-array, 이후 RoleAssignment 로 정규화) */
  @Column({ type: 'simple-array', default: '' })
  roles: string[];

  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true, select: false })
  passwordHash: string | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ name: 'is_external_partner', type: 'boolean', default: false })
  isExternalPartner: boolean;

  /**
   * 확장 프로필 (설계 OP-06A UserDetail: 영문명, 사번, 조직, 부서, 직위, 주기장,
   * 알림채널, locale, timezone, 접근범위, 시작/종료일, 계정만료, 기본그룹/Role,
   * 권한만료, 저장사유, assignments[], history[] ...)
   * 정식 페이즈에서 UserDetail/RoleAssignment 테이블로 정규화한다.
   */
  @Column({ type: 'jsonb', nullable: true })
  detail: Record<string, unknown> | null;
}
