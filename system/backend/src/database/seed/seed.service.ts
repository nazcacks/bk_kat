import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Menu } from '../../modules/menus/menu.entity';
import { User } from '../../modules/users/user.entity';
import { CommonCodeGroup, CommonCodeItem } from '../../modules/common-codes/common-code.entity';
import { MaskingPolicy } from '../../modules/security/entities/masking-policy.entity';
import { MENU_SEED } from './menu.seed';

/**
 * 초기 데이터 시드 — 애플리케이션 기동 시 비어 있는 테이블에만 삽입 (멱등).
 */
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(CommonCodeGroup) private readonly codeGroupRepo: Repository<CommonCodeGroup>,
    @InjectRepository(CommonCodeItem) private readonly codeItemRepo: Repository<CommonCodeItem>,
    @InjectRepository(MaskingPolicy) private readonly maskingRepo: Repository<MaskingPolicy>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedMenus();
    await this.seedUsers();
    await this.seedCommonCodes();
    await this.seedMaskingPolicies();
  }

  private async seedMenus(): Promise<void> {
    if ((await this.menuRepo.count()) > 0) return;
    await this.menuRepo.save(this.menuRepo.create(MENU_SEED));
    this.logger.log(`메뉴 시드 완료 (${MENU_SEED.length}건)`);
  }

  private async seedUsers(): Promise<void> {
    if ((await this.userRepo.count()) > 0) return;
    const hash = await bcrypt.hash('admin1234!', 10);
    await this.userRepo.save(
      this.userRepo.create([
        {
          loginId: 'admin',
          name: '조강수',
          email: 'kang-soo.cho@kr.ey.com',
          phone: '010-1234-5678',
          userGroup: 'OPERATOR',
          tenantId: null,
          status: 'ACTIVE',
          roles: ['BK_MANAGER', 'SEC_ADMIN'],
          passwordHash: hash,
          source: 'SEED',
        },
        {
          loginId: 'bk_preparer',
          name: '김기장',
          email: 'preparer@example.com',
          phone: '010-2345-6789',
          userGroup: 'OPERATOR',
          tenantId: null,
          status: 'ACTIVE',
          roles: ['BK_PREPARER'],
          passwordHash: hash,
          source: 'SEED',
        },
        {
          loginId: 'tenant_admin',
          name: '이회계',
          email: 'accounting@bktest.co.kr',
          phone: '010-3456-7890',
          userGroup: 'TENANT',
          tenantId: 'T0001',
          status: 'ACTIVE',
          roles: ['TENANT_ADMIN'],
          passwordHash: hash,
          source: 'SEED',
        },
        {
          loginId: 'viewer',
          name: '박열람',
          email: 'viewer@bktest.co.kr',
          phone: '010-4567-8901',
          userGroup: 'TENANT',
          tenantId: 'T0001',
          status: 'LOCKED',
          roles: ['VIEWER'],
          passwordHash: hash,
          source: 'SEED',
        },
      ]),
    );
    this.logger.log('사용자 시드 완료 (4건)');
  }

  private async seedCommonCodes(): Promise<void> {
    if ((await this.codeGroupRepo.count()) > 0) return;
    await this.codeGroupRepo.save(
      this.codeGroupRepo.create([
        { groupCode: 'JOURNAL_TYPE', groupName: '전표유형', description: '일반전표 구분 (설계서 JournalHeader.type)' },
        { groupCode: 'VAT_TYPE', groupName: '부가세 과세유형', description: '매입매출전표 과세유형' },
        { groupCode: 'ENTRY_CODE', groupName: '차대구분', description: '분개 라인 차변/대변 구분' },
        { groupCode: 'USER_STATUS', groupName: '사용자 상태', description: '계정 상태머신 (설계서 4장)' },
      ]),
    );
    await this.codeItemRepo.save(
      this.codeItemRepo.create([
        { groupCode: 'JOURNAL_TYPE', code: 'TRANSFER', name: '대체', sortOrder: 1 },
        { groupCode: 'JOURNAL_TYPE', code: 'RECEIPT', name: '입금', sortOrder: 2 },
        { groupCode: 'JOURNAL_TYPE', code: 'PAYMENT', name: '출금', sortOrder: 3 },
        { groupCode: 'JOURNAL_TYPE', code: 'PURCHASE', name: '매입', sortOrder: 4 },
        { groupCode: 'JOURNAL_TYPE', code: 'SALES', name: '매출', sortOrder: 5 },
        { groupCode: 'VAT_TYPE', code: 'TAXABLE', name: '과세', sortOrder: 1, attributes: { rate: 10 } },
        { groupCode: 'VAT_TYPE', code: 'ZERO_RATED', name: '영세', sortOrder: 2, attributes: { rate: 0 } },
        { groupCode: 'VAT_TYPE', code: 'EXEMPT', name: '면세', sortOrder: 3, attributes: { rate: null } },
        { groupCode: 'ENTRY_CODE', code: 'DR', name: '차변', sortOrder: 1 },
        { groupCode: 'ENTRY_CODE', code: 'CR', name: '대변', sortOrder: 2 },
        { groupCode: 'ENTRY_CODE', code: 'CLOSING_DR', name: '결차', sortOrder: 3 },
        { groupCode: 'ENTRY_CODE', code: 'CLOSING_CR', name: '결대', sortOrder: 4 },
        { groupCode: 'USER_STATUS', code: 'ACTIVE', name: '활성', sortOrder: 1 },
        { groupCode: 'USER_STATUS', code: 'LOCKED', name: '잠금', sortOrder: 2 },
        { groupCode: 'USER_STATUS', code: 'PASSWORD_EXPIRED', name: '비밀번호만료', sortOrder: 3 },
        { groupCode: 'USER_STATUS', code: 'SUSPENDED', name: '정지', sortOrder: 4 },
        { groupCode: 'USER_STATUS', code: 'DORMANT', name: '휴면', sortOrder: 5 },
        { groupCode: 'USER_STATUS', code: 'DISABLED', name: '비활성', sortOrder: 6 },
      ]),
    );
    this.logger.log('공통코드 시드 완료');
  }

  private async seedMaskingPolicies(): Promise<void> {
    if ((await this.maskingRepo.count()) > 0) return;
    await this.maskingRepo.save(
      this.maskingRepo.create([
        { dataType: 'GENERAL', fieldName: 'name', maskPattern: 'name', description: '성명 — 가운데 마스킹 (홍*동)' },
        { dataType: 'GENERAL', fieldName: 'email', maskPattern: 'email', description: '이메일 — 로컬부 마스킹 (ab****@domain)' },
        { dataType: 'GENERAL', fieldName: 'phone', maskPattern: 'phone', description: '전화번호 — 가운데 마스킹 (010-****-5678)' },
        { dataType: 'UNIQUE_ID', fieldName: 'rrn', maskPattern: 'rrn', description: '주민등록번호 — 뒤 6자리 마스킹, AES-256 암호화 저장', requiredGrant: 'SENSITIVE_UNIQUE_ID' },
        { dataType: 'FINANCIAL', fieldName: 'account', maskPattern: 'account', description: '계좌번호 — 가운데 마스킹, 암호화 저장', requiredGrant: 'SENSITIVE_FINANCIAL' },
        { dataType: 'FINANCIAL', fieldName: 'card', maskPattern: 'card', description: '카드번호 — 가운데 8자리 마스킹, 암호화 저장', requiredGrant: 'SENSITIVE_FINANCIAL' },
      ]),
    );
    this.logger.log('마스킹 정책 시드 완료');
  }
}
