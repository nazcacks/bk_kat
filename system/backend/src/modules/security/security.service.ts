import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { PersonalDataAccessLog } from './entities/personal-data-access-log.entity';
import { LoginHistory } from './entities/login-history.entity';
import { MaskingPolicy } from './entities/masking-policy.entity';
import { CryptoUtil } from '../../common/utils/crypto.util';
import { PageRequestDto, PageResponse, toPage } from '../../common/dto/page.dto';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
    @InjectRepository(PersonalDataAccessLog)
    private readonly privacyRepo: Repository<PersonalDataAccessLog>,
    @InjectRepository(LoginHistory)
    private readonly loginRepo: Repository<LoginHistory>,
    @InjectRepository(MaskingPolicy)
    private readonly maskingRepo: Repository<MaskingPolicy>,
  ) {}

  // ── 감사로그 (append-only + 해시체인) ──────────────────────────

  async writeAuditLog(entry: Partial<AuditLog>): Promise<void> {
    try {
      const last = await this.auditRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const prevHash = last[0]?.chainHash ?? null;
      const body = JSON.stringify({
        tenantId: entry.tenantId ?? null,
        userId: entry.userId ?? null,
        action: entry.action,
        resource: entry.resource,
        requestPath: entry.requestPath ?? null,
        afterData: entry.afterData ?? null,
      });
      const chainHash = CryptoUtil.sha256(`${prevHash ?? ''}${body}`);
      await this.auditRepo.save(this.auditRepo.create({ ...entry, prevHash, chainHash }));
    } catch (e) {
      // 감사 기록 실패가 업무 트랜잭션을 막지 않도록 로깅만 (운영에서는 보안 이벤트 발행)
      this.logger.error(`감사로그 기록 실패: ${(e as Error).message}`);
    }
  }

  /** 해시체인 무결성 검증 (설계서 AuditLogChain) */
  async verifyAuditChain(limit = 1000): Promise<{ valid: boolean; checked: number }> {
    const rows = await this.auditRepo.find({ order: { id: 'ASC' }, take: limit });
    let prevHash: string | null = null;
    for (const row of rows) {
      if (row.prevHash !== prevHash) return { valid: false, checked: rows.length };
      prevHash = row.chainHash;
    }
    return { valid: true, checked: rows.length };
  }

  async findAuditLogs(req: PageRequestDto): Promise<PageResponse<AuditLog>> {
    const [items, total] = await this.auditRepo.findAndCount({
      order: { id: 'DESC' },
      skip: (req.page - 1) * req.size,
      take: req.size,
    });
    return toPage(items, total, req);
  }

  // ── 개인정보 접근로그 ──────────────────────────────────────────

  async writePrivacyAccessLog(entry: Partial<PersonalDataAccessLog>): Promise<void> {
    try {
      await this.privacyRepo.insert(entry as PersonalDataAccessLog);
    } catch (e) {
      this.logger.error(`개인정보 접근로그 기록 실패: ${(e as Error).message}`);
    }
  }

  async findPrivacyAccessLogs(
    req: PageRequestDto,
  ): Promise<PageResponse<PersonalDataAccessLog>> {
    const [items, total] = await this.privacyRepo.findAndCount({
      order: { id: 'DESC' },
      skip: (req.page - 1) * req.size,
      take: req.size,
    });
    return toPage(items, total, req);
  }

  // ── 로그인 이력 ────────────────────────────────────────────────

  async writeLoginHistory(entry: Partial<LoginHistory>): Promise<void> {
    try {
      await this.loginRepo.insert(entry as LoginHistory);
    } catch (e) {
      this.logger.error(`로그인 이력 기록 실패: ${(e as Error).message}`);
    }
  }

  async findLoginHistories(req: PageRequestDto): Promise<PageResponse<LoginHistory>> {
    const [items, total] = await this.loginRepo.findAndCount({
      order: { id: 'DESC' },
      skip: (req.page - 1) * req.size,
      take: req.size,
    });
    return toPage(items, total, req);
  }

  // ── 마스킹 정책 ────────────────────────────────────────────────

  findMaskingPolicies(): Promise<MaskingPolicy[]> {
    return this.maskingRepo.find({ order: { dataType: 'ASC', fieldName: 'ASC' } });
  }

  async createMaskingPolicy(data: Partial<MaskingPolicy>): Promise<MaskingPolicy> {
    return this.maskingRepo.save(
      this.maskingRepo.create({
        dataType: data.dataType ?? 'GENERAL',
        fieldName: data.fieldName ?? '',
        maskPattern: data.maskPattern ?? 'name',
        description: data.description ?? null,
        requiredGrant: data.requiredGrant ?? null,
        isActive: data.isActive ?? true,
      }),
    );
  }

  async updateMaskingPolicy(id: string, data: Partial<MaskingPolicy>): Promise<MaskingPolicy | null> {
    const allowed: Partial<MaskingPolicy> = {};
    if (data.isActive !== undefined) allowed.isActive = data.isActive;
    if (data.maskPattern !== undefined) allowed.maskPattern = data.maskPattern;
    if (data.description !== undefined) allowed.description = data.description;
    if (data.requiredGrant !== undefined) allowed.requiredGrant = data.requiredGrant;
    await this.maskingRepo.update(id, allowed);
    return this.maskingRepo.findOneBy({ id });
  }

  async removeMaskingPolicy(id: string): Promise<{ id: string; deleted: boolean }> {
    await this.maskingRepo.delete(id);
    return { id, deleted: true };
  }
}
