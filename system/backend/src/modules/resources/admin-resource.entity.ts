import { Entity, Index, Opt, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';

/**
 * 운영 콘솔 공통 리소스 (프레임워크 공통 CRUD)
 * 아직 정식 스키마가 확정되지 않은 운영 리소스(테넌트/사용자그룹/인증정책/Role/배치잡/
 * 접근세션/개인정보정책 등)를 resourceType + jsonb 로 관리한다.
 * 정식 페이즈에서 개별 테이블로 승격 시 이 테이블에서 이관한다.
 */
@Entity({ tableName: 'admin_resource' })
@Index({ properties: ['resourceType'] })
export class AdminResource extends BaseEntity {
  /** tenant / user-group / auth-policy / role / batch-job / access-session / privacy-policy ... */
  @Property({ fieldName: 'resource_type', length: 40 })
  resourceType: string;

  @Property({ columnType: 'jsonb' })
  data: Record<string, unknown>;

  @Property({ fieldName: 'is_active', default: true })
  isActive: boolean & Opt = true;
}
