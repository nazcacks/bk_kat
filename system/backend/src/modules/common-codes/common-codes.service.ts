import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonCodeGroup, CommonCodeItem } from './common-code.entity';

export interface CodeGroupWithItems {
  groupCode: string;
  groupName: string;
  nameEn: string | null;
  domain: string | null;
  policy: string | null;
  description: string | null;
  items: { code: string; name: string; nameEn: string | null; sortOrder: number; isActive: boolean }[];
}

@Injectable()
export class CommonCodesService {
  constructor(
    @InjectRepository(CommonCodeGroup)
    private readonly groupRepo: Repository<CommonCodeGroup>,
    @InjectRepository(CommonCodeItem)
    private readonly itemRepo: Repository<CommonCodeItem>,
  ) {}

  async findAllGrouped(): Promise<CodeGroupWithItems[]> {
    const groups = await this.groupRepo.find({
      where: { isActive: true },
      order: { groupCode: 'ASC' },
    });
    const items = await this.itemRepo.find({ order: { sortOrder: 'ASC', code: 'ASC' } });
    return groups.map((g) => ({
      groupCode: g.groupCode,
      groupName: g.groupName,
      nameEn: g.nameEn,
      domain: g.domain,
      policy: g.policy,
      description: g.description,
      items: items
        .filter((i) => i.groupCode === g.groupCode)
        .map((i) => ({ code: i.code, name: i.name, nameEn: i.nameEn, sortOrder: i.sortOrder, isActive: i.isActive })),
    }));
  }

  async findItems(groupCode: string) {
    return this.itemRepo.find({
      where: { groupCode, isActive: true },
      order: { sortOrder: 'ASC', code: 'ASC' },
    });
  }

  countGroups(): Promise<number> {
    return this.groupRepo.count();
  }

  async seed(groups: Partial<CommonCodeGroup>[], items: Partial<CommonCodeItem>[]): Promise<void> {
    await this.groupRepo.save(this.groupRepo.create(groups));
    await this.itemRepo.save(this.itemRepo.create(items));
  }

  // ── 마스터(코드그룹) CRUD ──────────────────────────────────

  async createGroup(data: Partial<CommonCodeGroup>): Promise<CommonCodeGroup> {
    if (!data.groupCode || !data.groupName) {
      throw new BadRequestException('groupCode 와 groupName 은 필수입니다.');
    }
    if (await this.groupRepo.findOneBy({ groupCode: data.groupCode })) {
      throw new ConflictException(`코드그룹 '${data.groupCode}' 가 이미 존재합니다.`);
    }
    return this.groupRepo.save(
      this.groupRepo.create({
        groupCode: data.groupCode,
        groupName: data.groupName,
        nameEn: data.nameEn ?? null,
        domain: data.domain ?? null,
        policy: data.policy ?? 'ADMIN_MANAGED',
        description: data.description ?? null,
      }),
    );
  }

  async updateGroup(groupCode: string, data: Partial<CommonCodeGroup>): Promise<CommonCodeGroup> {
    const group = await this.groupRepo.findOneBy({ groupCode });
    if (!group) throw new NotFoundException(`코드그룹 '${groupCode}' 를 찾을 수 없습니다.`);
    if (data.groupName !== undefined) group.groupName = data.groupName;
    if (data.nameEn !== undefined) group.nameEn = data.nameEn;
    if (data.domain !== undefined) group.domain = data.domain;
    if (data.policy !== undefined) group.policy = data.policy;
    if (data.description !== undefined) group.description = data.description;
    if (data.isActive !== undefined) group.isActive = data.isActive;
    return this.groupRepo.save(group);
  }

  /** 세부 코드가 남아 있으면 삭제 차단 (COMMON_CODE_GROUP_REQUIRED 규칙 준용) */
  async removeGroup(groupCode: string): Promise<{ groupCode: string; deleted: boolean }> {
    const group = await this.groupRepo.findOneBy({ groupCode });
    if (!group) throw new NotFoundException(`코드그룹 '${groupCode}' 를 찾을 수 없습니다.`);
    const itemCount = await this.itemRepo.countBy({ groupCode });
    if (itemCount > 0) {
      throw new BadRequestException(`세부 코드 ${itemCount}건이 존재하여 삭제할 수 없습니다.`);
    }
    await this.groupRepo.delete({ groupCode });
    return { groupCode, deleted: true };
  }

  // ── 세부(코드항목) CRUD ────────────────────────────────────

  async createItem(groupCode: string, data: Partial<CommonCodeItem>): Promise<CommonCodeItem> {
    const group = await this.groupRepo.findOneBy({ groupCode });
    if (!group) {
      throw new BadRequestException(`코드그룹 '${groupCode}' 가 없습니다. (COMMON_CODE_GROUP_REQUIRED)`);
    }
    if (!data.code || !data.name) throw new BadRequestException('code 와 name 은 필수입니다.');
    if (await this.itemRepo.findOneBy({ groupCode, code: data.code })) {
      throw new ConflictException(`코드 '${groupCode}.${data.code}' 가 이미 존재합니다.`);
    }
    return this.itemRepo.save(
      this.itemRepo.create({
        groupCode,
        code: data.code,
        name: data.name,
        nameEn: data.nameEn ?? null,
        sortOrder: data.sortOrder ?? 0,
        attributes: data.attributes ?? null,
      }),
    );
  }

  async updateItem(groupCode: string, code: string, data: Partial<CommonCodeItem>): Promise<CommonCodeItem> {
    const item = await this.itemRepo.findOneBy({ groupCode, code });
    if (!item) throw new NotFoundException(`코드 '${groupCode}.${code}' 를 찾을 수 없습니다.`);
    if (data.name !== undefined) item.name = data.name;
    if (data.nameEn !== undefined) item.nameEn = data.nameEn;
    if (data.sortOrder !== undefined) item.sortOrder = data.sortOrder;
    if (data.isActive !== undefined) item.isActive = data.isActive;
    if (data.attributes !== undefined) item.attributes = data.attributes;
    return this.itemRepo.save(item);
  }

  async removeItem(groupCode: string, code: string): Promise<{ code: string; deleted: boolean }> {
    const item = await this.itemRepo.findOneBy({ groupCode, code });
    if (!item) throw new NotFoundException(`코드 '${groupCode}.${code}' 를 찾을 수 없습니다.`);
    await this.itemRepo.delete({ groupCode, code });
    return { code, deleted: true };
  }
}
