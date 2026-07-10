import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Menu } from '../../modules/menus/menu.entity';
import { User } from '../../modules/users/user.entity';
import { CommonCodeGroup, CommonCodeItem } from '../../modules/common-codes/common-code.entity';
import { MaskingPolicy } from '../../modules/security/entities/masking-policy.entity';
import { AdminResource } from '../../modules/resources/admin-resource.entity';
import { MENU_SEED } from './menu.seed';
import { RESOURCE_SEED } from './resource.seed';
import { CODE_GROUP_SEED, CODE_ITEM_SEED } from './common-code.seed';

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
    @InjectRepository(AdminResource) private readonly resourceRepo: Repository<AdminResource>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedMenus();
    await this.seedUsers();
    await this.seedCommonCodes();
    await this.seedMaskingPolicies();
    await this.seedResources();
  }

  private async seedResources(): Promise<void> {
    if ((await this.resourceRepo.count()) > 0) return;
    const rows: AdminResource[] = [];
    for (const [resourceType, items] of Object.entries(RESOURCE_SEED)) {
      for (const data of items) {
        rows.push(this.resourceRepo.create({ resourceType, data, source: 'SEED' }));
      }
    }
    await this.resourceRepo.save(rows);
    this.logger.log(`운영 리소스 시드 완료 (${rows.length}건)`);
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
          detail: {
            userIdCode: 'U-OP-00031', nameEn: 'Kangsoo Cho', externalId: 'EY-OPS-0031',
            operatorOrg: 'SYS-OPS · 시스템운영팀', department: '시스템운영팀', position: '매니저',
            primaryBookkeeper: '관리회사', notify: 'IN_APP + EMAIL', locale: 'ko-KR', timezone: 'Asia/Seoul',
            scope: 'GLOBAL', startDate: '2026-01-01', endDate: '9999-12-31', accountExpire: '9999-12-31',
            defaultGroup: '보안운영팀', defaultRole: 'SEC_ADMIN', roleExpire: '상시', reason: '정기 권한 점검 결과 유지',
            assignments: [
              ['사용자그룹', '보안운영팀', 'GLOBAL', '2026-01-01', '9999-12-31', 'ACTIVE'],
              ['Role', 'SEC_ADMIN', 'GLOBAL', '2026-01-01', '9999-12-31', 'ACTIVE'],
              ['메뉴정책', 'OP-08 DENY', '기장업무 제외', '2026-01-01', '9999-12-31', 'SOD'],
            ],
            history: ['2026-07-08 Role 유지', '2026-06-30 연락처 변경', '2026-06-01 그룹 재배정'],
          },
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
          detail: {
            userIdCode: 'U-OP-00109', nameEn: 'Kijang Kim', externalId: 'EY-OPS-0109',
            operatorOrg: 'BK-OPS · 기장운영팀', department: '기장운영팀', position: '스태프',
            primaryBookkeeper: '관리회사', notify: 'IN_APP', locale: 'ko-KR', timezone: 'Asia/Seoul',
            scope: 'OPERATOR_ORG', startDate: '2026-03-01', endDate: '9999-12-31', accountExpire: '2026-09-30',
            defaultGroup: '기장운영팀', defaultRole: 'BK_PREPARER', roleExpire: '2026-12-31', reason: '기장 담당 배정',
            assignments: [
              ['사용자그룹', '기장운영팀', 'OPERATOR_ORG', '2026-03-01', '9999-12-31', 'ACTIVE'],
              ['Role', 'BK_PREPARER', 'OPERATOR_ORG', '2026-03-01', '2026-12-31', 'ACTIVE'],
            ],
            history: ['2026-03-01 기장운영팀 배정'],
          },
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
          detail: {
            userIdCode: 'U-TN-20451', nameEn: 'Accounting Lee', externalId: 'BK-ACC-0451',
            operatorOrg: '- 해당없음', department: '회계팀', position: '대리',
            primaryBookkeeper: '이용회사', notify: 'IN_APP + EMAIL', locale: 'ko-KR', timezone: 'Asia/Seoul',
            scope: 'TENANT_ONLY', startDate: '2026-01-10', endDate: '9999-12-31', accountExpire: '9999-12-31',
            defaultGroup: '회계팀', defaultRole: 'TENANT_ADMIN', roleExpire: '상시', reason: '이용회사 회계팀 관리자 유지',
            assignments: [
              ['사용자그룹', '회계팀', 'T0001', '2026-01-10', '9999-12-31', 'ACTIVE'],
              ['Role', 'TENANT_ADMIN', 'T0001', '2026-01-10', '9999-12-31', 'ACTIVE'],
              ['메뉴정책', 'TN 업무메뉴', '테넌트 범위', '2026-01-10', '9999-12-31', 'ACTIVE'],
            ],
            history: ['2026-02-15 TOTP 등록', '2026-01-10 회계팀 초대'],
          },
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
          detail: {
            userIdCode: 'U-TN-20452', nameEn: 'Viewer Park', externalId: 'BK-VIEW-0452',
            operatorOrg: '- 해당없음', department: '재무팀', position: '사원',
            primaryBookkeeper: '이용회사', notify: 'EMAIL', locale: 'ko-KR', timezone: 'Asia/Seoul',
            scope: 'TENANT_ONLY', startDate: '2026-02-01', endDate: '9999-12-31', accountExpire: '9999-12-31',
            defaultGroup: '재무팀', defaultRole: 'VIEWER', roleExpire: '2026-12-31', reason: '열람 전용 계정 · 로그인 5회 실패 잠금',
            assignments: [
              ['사용자그룹', '재무팀', 'T0001', '2026-02-01', '9999-12-31', 'ACTIVE'],
              ['Role', 'VIEWER', 'T0001', '2026-02-01', '2026-12-31', 'ACTIVE'],
            ],
            history: ['2026-07-01 로그인 5회 실패 잠금', '2026-02-01 초대'],
          },
        },
      ]),
    );
    this.logger.log('사용자 시드 완료 (4건)');
  }

  /** 시스템 공통코드 — 설계 HTML COMMON_CODE_CATALOG 기준 */
  private async seedCommonCodes(): Promise<void> {
    if ((await this.codeGroupRepo.count()) > 0) return;
    await this.codeGroupRepo.save(this.codeGroupRepo.create(CODE_GROUP_SEED));
    // 항목이 많아 배치 저장 (chunk)
    await this.codeItemRepo.save(this.codeItemRepo.create(CODE_ITEM_SEED), { chunk: 100 });
    this.logger.log(`공통코드 시드 완료 (그룹 ${CODE_GROUP_SEED.length}개 · 코드 ${CODE_ITEM_SEED.length}건)`);
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
