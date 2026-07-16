import { Entity, Opt, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';

/**
 * 메뉴 마스터 (설계서 4.3 메뉴·권한 평가 모델)
 * 채널(OP/TN/CO) × 4단(GROUP/MENU/TAB/ACTION).
 * 권한 없는 메뉴는 미노출이 원칙 — 프레임워크 단계에서는 isVisible 로 제어.
 */
@Entity({ tableName: 'menu' })
@Unique({ name: 'IDX_334e140ef3baefedf7c7277ae8', properties: ['menuCode'] })
export class Menu extends BaseEntity {
  @Property({ fieldName: 'menu_code', length: 32 })
  menuCode: string;

  @Property({ fieldName: 'parent_code', length: 32, nullable: true })
  parentCode: string | null = null;

  /** OP(운영콘솔) / TN(업무화면) / CO(공통) */
  @Property({ length: 8, default: 'TN' })
  channel: string & Opt = 'TN';

  /** GROUP / MENU / TAB / ACTION */
  @Property({ fieldName: 'menu_type', length: 8, default: 'MENU' })
  menuType: string & Opt = 'MENU';

  @Property({ length: 100 })
  name: string;

  @Property({ fieldName: 'name_en', length: 100, nullable: true })
  nameEn: string | null = null;

  @Property({ length: 255, nullable: true })
  path: string | null = null;

  @Property({ length: 16, nullable: true })
  icon: string | null = null;

  /** 설계서 화면 ID (SA-JNL-01 등) */
  @Property({ fieldName: 'screen_id', length: 32, nullable: true })
  screenId: string | null = null;

  @Property({ fieldName: 'sort_order', columnType: 'int', default: 0 })
  sortOrder: number & Opt = 0;

  @Property({ fieldName: 'is_visible', default: true })
  isVisible: boolean & Opt = true;

  /** 진입 시 Step-up 재인증 필요 (마감/결산/신고 등) */
  @Property({ fieldName: 'requires_step_up', default: false })
  requiresStepUp: boolean & Opt = false;

  @Property({ fieldName: 'is_active', default: true })
  isActive: boolean & Opt = true;
}
