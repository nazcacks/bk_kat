import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** 공통코드 그룹 (설계서 OP-05C CommonCodeGroup) */
@Entity('common_code_group')
@Index(['groupCode'], { unique: true })
export class CommonCodeGroup extends BaseEntity {
  @Column({ name: 'group_code', type: 'varchar', length: 32 })
  groupCode: string;

  @Column({ name: 'group_name', type: 'varchar', length: 100 })
  groupName: string;

  @Column({ name: 'name_en', type: 'varchar', length: 100, nullable: true })
  nameEn: string | null;

  /** AUTH / TENANT / MENU / BATCH / SECURITY / JOURNAL ... (설계 OP-05C 도메인) */
  @Column({ type: 'varchar', length: 32, nullable: true })
  domain: string | null;

  /** SYSTEM_LOCKED(예약, 변경금지) / ADMIN_MANAGED / STANDARD_MANAGED */
  @Column({ type: 'varchar', length: 32, nullable: true })
  policy: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}

/** 공통코드 항목 (설계서 CommonCodeItem) */
@Entity('common_code_item')
@Index(['groupCode', 'code'], { unique: true })
export class CommonCodeItem extends BaseEntity {
  @Column({ name: 'group_code', type: 'varchar', length: 32 })
  groupCode: string;

  @Column({ type: 'varchar', length: 32 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'name_en', type: 'varchar', length: 100, nullable: true })
  nameEn: string | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  /** 추가 속성 (세율 등 코드별 부가 정보) */
  @Column({ type: 'jsonb', nullable: true })
  attributes: Record<string, unknown> | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
