import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonCodeGroup, CommonCodeItem } from './common-code.entity';

export interface CodeGroupWithItems {
  groupCode: string;
  groupName: string;
  description: string | null;
  items: { code: string; name: string; sortOrder: number; isActive: boolean }[];
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
      description: g.description,
      items: items
        .filter((i) => i.groupCode === g.groupCode)
        .map((i) => ({ code: i.code, name: i.name, sortOrder: i.sortOrder, isActive: i.isActive })),
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
}
