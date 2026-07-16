import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
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
    private readonly repo: EntityRepository<AdminResource>,
    private readonly em: EntityManager,
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
    const rows = await this.repo.find({ resourceType, isActive: true }, {
      orderBy: { id: 'ASC' },
    });
    return rows.map((r) => this.toDto(r));
  }

  async create(resourceType: string, data: Record<string, unknown>): Promise<ResourceDto> {
    const resource = this.repo.create({ resourceType, data });
    await this.em.persistAndFlush(resource);
    return this.toDto(resource);
  }

  async update(resourceType: string, id: string, data: Record<string, unknown>): Promise<ResourceDto> {
    const row = await this.repo.findOne({ id, resourceType });
    if (!row) throw new NotFoundException(`${resourceType}#${id} 를 찾을 수 없습니다.`);
    row.data = { ...row.data, ...data };
    await this.em.flush();
    return this.toDto(row);
  }

  /** 물리 삭제 대신 비활성 처리 (감사 추적 보존) */
  async remove(resourceType: string, id: string): Promise<{ id: string; deleted: boolean }> {
    const row = await this.repo.findOne({ id, resourceType });
    if (!row) throw new NotFoundException(`${resourceType}#${id} 를 찾을 수 없습니다.`);
    row.isActive = false;
    await this.em.flush();
    return { id, deleted: true };
  }

  async count(resourceType: string): Promise<number> {
    return this.repo.count({ resourceType });
  }

  async seed(resourceType: string, items: Record<string, unknown>[]): Promise<void> {
    const entities = items.map((data) => this.repo.create({ resourceType, data, source: 'SEED' }));
    await this.em.persistAndFlush(entities);
  }
}
