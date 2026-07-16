import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Menu } from './menu.entity';
import { ErrorCodes } from '../../common/constants/error-codes';

export interface MenuNode {
  menuCode: string;
  name: string;
  nameEn: string | null;
  menuType: string;
  channel: string;
  path: string | null;
  icon: string | null;
  screenId: string | null;
  sortOrder: number;
  requiresStepUp: boolean;
  children: MenuNode[];
}

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: EntityRepository<Menu>,
    private readonly em: EntityManager,
  ) {}

  findAll(channel?: string): Promise<Menu[]> {
    return this.menuRepo.find(channel ? { channel } : {}, {
      orderBy: { sortOrder: 'ASC', menuCode: 'ASC' },
    });
  }

  /**
   * 메뉴 트리 반환. channel 미지정 시 3채널(OP/TN/CO) 전체.
   * 권한 평가(RoleMenuPermission)는 후속 단계 — 현재는 isVisible/isActive 만 필터.
   */
  async findTree(channel?: string): Promise<MenuNode[]> {
    const menus = await this.menuRepo.find({ isActive: true, isVisible: true }, {
      orderBy: { sortOrder: 'ASC', menuCode: 'ASC' },
    });
    const filtered = channel ? menus.filter((m) => m.channel === channel) : menus;

    const toNode = (m: Menu): MenuNode => ({
      menuCode: m.menuCode,
      name: m.name,
      nameEn: m.nameEn,
      menuType: m.menuType,
      channel: m.channel,
      path: m.path,
      icon: m.icon,
      screenId: m.screenId,
      sortOrder: m.sortOrder,
      requiresStepUp: m.requiresStepUp,
      children: [],
    });

    const nodeMap = new Map<string, MenuNode>();
    filtered.forEach((m) => nodeMap.set(m.menuCode, toNode(m)));

    const roots: MenuNode[] = [];
    for (const m of filtered) {
      const node = nodeMap.get(m.menuCode)!;
      if (m.parentCode && nodeMap.has(m.parentCode)) {
        nodeMap.get(m.parentCode)!.children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  count(): Promise<number> {
    return this.menuRepo.count();
  }

  async bulkInsert(menus: Partial<Menu>[]): Promise<void> {
    const entities = menus.map((menu) => this.menuRepo.create(menu, { partial: true }));
    await this.em.persistAndFlush(entities);
  }

  // ── CRUD (설계 OP-06D: 코드/라우트 중복, 부모 유형, 사용 중 삭제 검증) ──

  async create(data: Partial<Menu>): Promise<Menu> {
    if (!data.menuCode || !data.name) {
      throw new BadRequestException('menuCode 와 name(국문명) 은 필수입니다. (MENU_I18N_REQUIRED)');
    }
    if (await this.menuRepo.findOne({ menuCode: data.menuCode })) {
      throw new ConflictException({
        code: ErrorCodes.DUPLICATE_RESOURCE,
        message: `메뉴코드 '${data.menuCode}' 가 이미 존재합니다.`,
      });
    }
    if (data.parentCode) {
      const parent = await this.menuRepo.findOne({ menuCode: data.parentCode });
      if (!parent) throw new BadRequestException(`상위메뉴 '${data.parentCode}' 가 존재하지 않습니다.`);
      if (parent.menuType !== 'GROUP') {
        throw new BadRequestException(`상위메뉴 '${data.parentCode}' 는 GROUP 유형이어야 합니다.`);
      }
    }
    const menu = this.menuRepo.create({
        menuCode: data.menuCode,
        parentCode: data.parentCode ?? null,
        channel: data.channel ?? 'TN',
        menuType: data.menuType ?? 'MENU',
        name: data.name,
        nameEn: data.nameEn ?? null,
        path: data.path ?? null,
        screenId: data.screenId ?? null,
        sortOrder: data.sortOrder ?? 9999,
        requiresStepUp: data.requiresStepUp ?? false,
      });
    await this.em.persistAndFlush(menu);
    return menu;
  }

  async update(id: string, data: Partial<Menu>): Promise<Menu> {
    const menu = await this.menuRepo.findOne({ id });
    if (!menu) throw new NotFoundException('메뉴를 찾을 수 없습니다.');
    const allowed: (keyof Menu)[] = [
      'parentCode', 'channel', 'menuType', 'name', 'nameEn', 'path',
      'screenId', 'sortOrder', 'isVisible', 'requiresStepUp', 'isActive',
    ];
    for (const key of allowed) {
      if (data[key] !== undefined) (menu as unknown as Record<string, unknown>)[key] = data[key];
    }
    await this.em.flush();
    return menu;
  }

  /** 하위 메뉴가 있으면 삭제 차단 (사용 중 삭제 검증) */
  async remove(id: string): Promise<{ id: string; deleted: boolean }> {
    const menu = await this.menuRepo.findOne({ id });
    if (!menu) throw new NotFoundException('메뉴를 찾을 수 없습니다.');
    const childCount = await this.menuRepo.count({ parentCode: menu.menuCode });
    if (childCount > 0) {
      throw new BadRequestException(
        `하위 메뉴 ${childCount}건이 존재하여 삭제할 수 없습니다. 하위 메뉴를 먼저 정리하세요.`,
      );
    }
    await this.menuRepo.nativeDelete({ id });
    return { id, deleted: true };
  }
}
