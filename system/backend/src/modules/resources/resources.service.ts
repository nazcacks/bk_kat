import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminResource } from './admin-resource.entity';

export interface ResourceDto {
  id: string;
  resourceType: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(AdminResource)
    private readonly repo: Repository<AdminResource>,
  ) {}

  private toDto(r: AdminResource): ResourceDto {
    return {
      id: r.id,
      resourceType: r.resourceType,
      data: r.data,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  async findAll(resourceType: string): Promise<ResourceDto[]> {
    const rows = await this.repo.find({
      where: { resourceType, isActive: true },
      order: { id: 'ASC' },
    });
    return rows.map((r) => this.toDto(r));
  }

  async create(resourceType: string, data: Record<string, unknown>): Promise<ResourceDto> {
    const saved = await this.repo.save(this.repo.create({ resourceType, data }));
    return this.toDto(saved);
  }

  async update(resourceType: string, id: string, data: Record<string, unknown>): Promise<ResourceDto> {
    const row = await this.repo.findOneBy({ id, resourceType });
    if (!row) throw new NotFoundException(`${resourceType}#${id} 를 찾을 수 없습니다.`);
    row.data = { ...row.data, ...data };
    return this.toDto(await this.repo.save(row));
  }

  /** 물리 삭제 대신 비활성 처리 (감사 추적 보존) */
  async remove(resourceType: string, id: string): Promise<{ id: string; deleted: boolean }> {
    const row = await this.repo.findOneBy({ id, resourceType });
    if (!row) throw new NotFoundException(`${resourceType}#${id} 를 찾을 수 없습니다.`);
    row.isActive = false;
    await this.repo.save(row);
    return { id, deleted: true };
  }

  async count(resourceType: string): Promise<number> {
    return this.repo.countBy({ resourceType });
  }

  async seed(resourceType: string, items: Record<string, unknown>[]): Promise<void> {
    await this.repo.save(items.map((data) => this.repo.create({ resourceType, data, source: 'SEED' })));
  }
}
