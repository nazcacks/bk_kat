import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/**
 * 메뉴 마스터 (설계서 4.3 메뉴·권한 평가 모델)
 * 채널(OP/TN/CO) × 4단(GROUP/MENU/TAB/ACTION).
 * 권한 없는 메뉴는 미노출이 원칙 — 프레임워크 단계에서는 isVisible 로 제어.
 */
@Entity('menu')
@Index(['menuCode'], { unique: true })
export class Menu extends BaseEntity {
  @Column({ name: 'menu_code', type: 'varchar', length: 32 })
  menuCode: string;

  @Column({ name: 'parent_code', type: 'varchar', length: 32, nullable: true })
  parentCode: string | null;

  /** OP(운영콘솔) / TN(업무화면) / CO(공통) */
  @Column({ type: 'varchar', length: 8, default: 'TN' })
  channel: string;

  /** GROUP / MENU / TAB / ACTION */
  @Column({ name: 'menu_type', type: 'varchar', length: 8, default: 'MENU' })
  menuType: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'name_en', type: 'varchar', length: 100, nullable: true })
  nameEn: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  path: string | null;

  @Column({ type: 'varchar', length: 16, nullable: true })
  icon: string | null;

  /** 설계서 화면 ID (SA-JNL-01 등) */
  @Column({ name: 'screen_id', type: 'varchar', length: 32, nullable: true })
  screenId: string | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_visible', type: 'boolean', default: true })
  isVisible: boolean;

  /** 진입 시 Step-up 재인증 필요 (마감/결산/신고 등) */
  @Column({ name: 'requires_step_up', type: 'boolean', default: false })
  requiresStepUp: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
