import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
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
    private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly securityService: SecurityService,
  ) {}

  findByLoginId(loginId: string): Promise<User | null> {
    return this.userRepo.findOne({ loginId });
  }

  async createIfAbsent(data: Partial<User>): Promise<User> {
    const existing = await this.userRepo.findOne({ loginId: data.loginId! });
    if (existing) return existing;
    const user = this.userRepo.create(data, { partial: true });
    await this.em.persistAndFlush(user);
    return user;
  }

  async touchLastLogin(id: string): Promise<void> {
    await this.userRepo.nativeUpdate({ id }, { lastLoginAt: new Date() });
  }

  /** 목록 조회 — 개인정보는 마스킹하여 반환 (설계서 21.4) */
  async findAllMasked(req: PageRequestDto): Promise<PageResponse<Record<string, unknown>>> {
    const [items, total] = await this.userRepo.findAndCount({}, {
      orderBy: { id: 'ASC' },
      offset: (req.page - 1) * req.size,
      limit: req.size,
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
      detail: u.detail,
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
    const user = await this.userRepo.findOne({ id });
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

  // ── CRUD (설계 4장: loginId 전역 유일, 계정 상태머신) ─────────────

  async createUser(data: Partial<User>): Promise<User> {
    if (!data.loginId || !data.name) {
      throw new BadRequestException('loginId 와 name 은 필수입니다.');
    }
    const dup = await this.userRepo.findOne({ loginId: data.loginId });
    if (dup) {
      throw new ConflictException({
        code: ErrorCodes.DUPLICATE_RESOURCE,
        message: `USER_LOGIN_ID_DUPLICATED: '${data.loginId}' 는 이미 존재합니다.`,
      });
    }
    const user = this.userRepo.create({
        loginId: data.loginId,
        name: data.name,
        email: data.email ?? null,
        phone: data.phone ?? null,
        userGroup: data.userGroup === 'OPERATOR' ? 'OPERATOR' : 'TENANT',
        tenantId: data.tenantId ?? null,
        status: data.status ?? 'ACTIVE',
        roles: data.roles ?? [],
        detail: data.detail ?? null,
      });
    await this.em.persistAndFlush(user);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({ id });
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    // loginId 는 변경 불가(전역 식별자), 허용 필드만 갱신
    const allowed: (keyof User)[] = ['name', 'email', 'phone', 'userGroup', 'tenantId', 'status', 'roles', 'detail'];
    // detail 은 병합 (부분 갱신 허용)
    if (data.detail !== undefined && user.detail) {
      data.detail = { ...user.detail, ...data.detail };
    }
    for (const key of allowed) {
      if (data[key] !== undefined) (user as unknown as Record<string, unknown>)[key] = data[key];
    }
    await this.em.flush();
    return user;
  }

  /** 삭제 = 비활성(DISABLED) 처리 — 계정 이력·감사 추적 보존 (물리 삭제 금지) */
  async disableUser(id: string): Promise<{ id: string; status: string }> {
    const user = await this.userRepo.findOne({ id });
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    user.status = 'DISABLED';
    await this.em.flush();
    return { id, status: 'DISABLED' };
  }
}
