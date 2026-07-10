import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

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
    private readonly menuRepo: Repository<Menu>,
  ) {}

  findAll(channel?: string): Promise<Menu[]> {
    return this.menuRepo.find({
      where: channel ? { channel } : {},
      order: { sortOrder: 'ASC', menuCode: 'ASC' },
    });
  }

  /**
   * 메뉴 트리 반환. channel 미지정 시 3채널(OP/TN/CO) 전체.
   * 권한 평가(RoleMenuPermission)는 후속 단계 — 현재는 isVisible/isActive 만 필터.
   */
  async findTree(channel?: string): Promise<MenuNode[]> {
    const menus = await this.menuRepo.find({
      where: { isActive: true, isVisible: true },
      order: { sortOrder: 'ASC', menuCode: 'ASC' },
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
    await this.menuRepo.save(this.menuRepo.create(menus));
  }
}
