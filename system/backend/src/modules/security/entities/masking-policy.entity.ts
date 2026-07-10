import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 마스킹 정책 (설계서 MaskingPolicy)
 * 개인정보 항목·화면·역할별 마스킹 규칙을 관리한다.
 */
@Entity('masking_policy')
@Unique(['dataType', 'fieldName'])
export class MaskingPolicy extends BaseEntity {
  /** 개인정보 분류 (GENERAL/UNIQUE_ID/SENSITIVE/FINANCIAL/PAYROLL) */
  @Column({ name: 'data_type', type: 'varchar', length: 32 })
  dataType: string;

  /** 대상 필드 (name/email/phone/rrn/account/card ...) */
  @Column({ name: 'field_name', type: 'varchar', length: 64 })
  fieldName: string;

  /** 적용 마스킹 함수 키 (Masking util 키와 일치) */
  @Column({ name: 'mask_pattern', type: 'varchar', length: 64 })
  maskPattern: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  /** 평문 조회에 필요한 민감정보 권한 코드 */
  @Column({ name: 'required_grant', type: 'varchar', length: 64, nullable: true })
  requiredGrant: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
