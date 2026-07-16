import { Entity, Opt, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 마스킹 정책 (설계서 MaskingPolicy)
 * 개인정보 항목·화면·역할별 마스킹 규칙을 관리한다.
 */
@Entity({ tableName: 'masking_policy' })
@Unique({ name: 'UQ_aaf797f430e1d60883587f3ab4f', properties: ['dataType', 'fieldName'] })
export class MaskingPolicy extends BaseEntity {
  /** 개인정보 분류 (GENERAL/UNIQUE_ID/SENSITIVE/FINANCIAL/PAYROLL) */
  @Property({ fieldName: 'data_type', length: 32 })
  dataType: string;

  /** 대상 필드 (name/email/phone/rrn/account/card ...) */
  @Property({ fieldName: 'field_name', length: 64 })
  fieldName: string;

  /** 적용 마스킹 함수 키 (Masking util 키와 일치) */
  @Property({ fieldName: 'mask_pattern', length: 64 })
  maskPattern: string;

  @Property({ length: 255, nullable: true })
  description: string | null = null;

  /** 평문 조회에 필요한 민감정보 권한 코드 */
  @Property({ fieldName: 'required_grant', length: 64, nullable: true })
  requiredGrant: string | null = null;

  @Property({ fieldName: 'is_active', default: true })
  isActive: boolean & Opt = true;
}
