import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Masking } from '../../common/utils/masking.util';
import { PageRequestDto, PageResponse, toPage } from '../../common/dto/page.dto';
import { SecurityService } from '../security/security.service';
import { AuthUser } from '../../common/decorators/current-user.decorator';
import { ErrorCodes } from '../../common/constants/error-codes';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly securityService: SecurityService,
  ) {}

  findByLoginId(loginId: string): Promise<User | null> {
    return this.userRepo.findOneBy({ loginId });
  }

  async createIfAbsent(data: Partial<User>): Promise<User> {
    const existing = await this.userRepo.findOneBy({ loginId: data.loginId! });
    if (existing) return existing;
    return this.userRepo.save(this.userRepo.create(data));
  }

  async touchLastLogin(id: string): Promise<void> {
    await this.userRepo.update(id, { lastLoginAt: new Date() });
  }

  /** 목록 조회 — 개인정보는 마스킹하여 반환 (설계서 21.4) */
  async findAllMasked(req: PageRequestDto): Promise<PageResponse<Record<string, unknown>>> {
    const [items, total] = await this.userRepo.findAndCount({
      order: { id: 'ASC' },
      skip: (req.page - 1) * req.size,
      take: req.size,
    });
    const masked = items.map((u) => ({
      id: u.id,
      loginId: u.loginId,
      name: u.name,
      email: Masking.email(u.email),
      phone: Masking.phone(u.phone),
      userGroup: u.userGroup,
      tenantId: u.tenantId,
      status: u.status,
      roles: u.roles,
      lastLoginAt: u.lastLoginAt,
    }));
    return toPage(masked, total, req);
  }

  /**
   * 개인정보 평문 조회 — 사유 필수 + 접근로그 기록 (설계서 21.5)
   */
  async findOnePlain(id: string, reason: string | undefined, actor: AuthUser, ip?: string, requestId?: string) {
    if (!reason || reason.trim().length < 2) {
      throw new BadRequestException({
        code: ErrorCodes.PRIVACY_REASON_REQUIRED,
        message: '개인정보 평문 조회에는 조회 사유 입력이 필요합니다.',
      });
    }
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    await this.securityService.writePrivacyAccessLog({
      tenantId: user.tenantId,
      userId: actor.userId,
      loginId: actor.loginId,
      userName: actor.name,
      targetType: 'USER',
      targetId: user.id,
      targetName: user.name,
      dataItems: ['email', 'phone'],
      accessType: 'VIEW_PLAIN',
      purpose: reason,
      recordCount: 1,
      ip: ip ?? null,
      requestId: requestId ?? null,
    });

    return {
      id: user.id,
      loginId: user.loginId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      userGroup: user.userGroup,
      tenantId: user.tenantId,
      status: user.status,
      roles: user.roles,
      lastLoginAt: user.lastLoginAt,
    };
  }

  count(): Promise<number> {
    return this.userRepo.count();
  }
}
