import { Entity, Opt, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';

/** 공통코드 그룹 (설계서 OP-05C CommonCodeGroup) */
@Entity({ tableName: 'common_code_group' })
@Unique({ name: 'IDX_3bb8d25ce2ed52649daf59053e', properties: ['groupCode'] })
export class CommonCodeGroup extends BaseEntity {
  @Property({ fieldName: 'group_code', length: 32 })
  groupCode: string;

  @Property({ fieldName: 'group_name', length: 100 })
  groupName: string;

  @Property({ fieldName: 'name_en', length: 100, nullable: true })
  nameEn: string | null = null;

  /** AUTH / TENANT / MENU / BATCH / SECURITY / JOURNAL ... (설계 OP-05C 도메인) */
  @Property({ length: 32, nullable: true })
  domain: string | null = null;

  /** SYSTEM_LOCKED(예약, 변경금지) / ADMIN_MANAGED / STANDARD_MANAGED */
  @Property({ length: 32, nullable: true })
  policy: string | null = null;

  @Property({ length: 500, nullable: true })
  description: string | null = null;

  @Property({ fieldName: 'is_active', default: true })
  isActive: boolean & Opt = true;
}

/** 공통코드 항목 (설계서 CommonCodeItem) */
@Entity({ tableName: 'common_code_item' })
@Unique({ name: 'IDX_93d1eb2b23bc68913d5fddbbda', properties: ['groupCode', 'code'] })
export class CommonCodeItem extends BaseEntity {
  @Property({ fieldName: 'group_code', length: 32 })
  groupCode: string;

  @Property({ length: 32 })
  code: string;

  @Property({ length: 100 })
  name: string;

  @Property({ fieldName: 'name_en', length: 100, nullable: true })
  nameEn: string | null = null;

  @Property({ fieldName: 'sort_order', columnType: 'int', default: 0 })
  sortOrder: number & Opt = 0;

  /** 추가 속성 (세율 등 코드별 부가 정보) */
  @Property({ columnType: 'jsonb', nullable: true })
  attributes: Record<string, unknown> | null = null;

  @Property({ fieldName: 'is_active', default: true })
  isActive: boolean & Opt = true;
}
