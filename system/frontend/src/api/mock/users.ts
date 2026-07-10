import type { FlatMenu, ManagedUser, Paged, RoleSummary } from '../../types';

const allUsers: ManagedUser[] = [
  { id: 'U-001', loginId: 'admin', name: '김관리', email: 'ad***@bktest.co.kr', phone: '010-****-1001', userGroup: 'TENANT_ADMIN', tenantId: 'bk-test-tenant', status: 'ACTIVE', roles: ['COMPANY_ADMIN'], lastLoginAt: '2026-07-09 08:52' },
  { id: 'U-002', loginId: 'acct01', name: '이회계', email: 'ac***@bktest.co.kr', phone: '010-****-1002', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'ACTIVE', roles: ['ACCOUNTING'], lastLoginAt: '2026-07-09 08:47' },
  { id: 'U-003', loginId: 'tax01', name: '박세무', email: 'ta***@bktest.co.kr', phone: '010-****-1003', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'ACTIVE', roles: ['TAX'], lastLoginAt: '2026-07-09 08:31' },
  { id: 'U-004', loginId: 'appr01', name: '정결재', email: 'ap***@bktest.co.kr', phone: '010-****-1004', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'ACTIVE', roles: ['APPROVER'], lastLoginAt: '2026-07-08 17:20' },
  { id: 'U-005', loginId: 'view01', name: '최열람', email: 'vi***@bktest.co.kr', phone: '010-****-1005', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'ACTIVE', roles: ['VIEWER'], lastLoginAt: '2026-07-08 18:02' },
  { id: 'U-006', loginId: 'acct02', name: '한재무', email: 'ac***@bktest.co.kr', phone: '010-****-1006', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'LOCKED', roles: ['ACCOUNTING'], lastLoginAt: '2026-06-30 11:44' },
  { id: 'U-007', loginId: 'temp01', name: '오임시', email: 'te***@bktest.co.kr', phone: '010-****-1007', userGroup: 'TENANT_USER', tenantId: 'bk-test-tenant', status: 'INACTIVE', roles: ['VIEWER'], lastLoginAt: null },
];

export function mockUsers(page: number, size: number): Paged<ManagedUser> {
  const start = (page - 1) * size;
  return { items: allUsers.slice(start, start + size), page, size, total: allUsers.length };
}

export const mockRoles: RoleSummary[] = [
  {
    roleCode: 'COMPANY_ADMIN', roleName: '회사관리자', userCount: 1,
    description: '테넌트 내 전체 기능·설정 관리 권한',
    permissions: ['사용자·역할 관리', '메뉴·권한 배정', '환경설정 변경', '마감·결산 승인 (Step-Up 필요)', '데이터 백업·복원'],
  },
  {
    roleCode: 'ACCOUNTING', roleName: '회계담당', userCount: 2,
    description: '전표 입력·장부 조회 등 회계 실무 권한',
    permissions: ['일반·매입매출 전표 입력', '장부·원장 조회', '전기이월 관리', '거래처·계정과목 관리'],
  },
  {
    roleCode: 'TAX', roleName: '세무담당', userCount: 1,
    description: '부가세 신고 등 세무 업무 권한',
    permissions: ['부가가치세 신고서 작성', '세금계산서합계표 조회', '신고 일정 관리', '장부 조회'],
  },
  {
    roleCode: 'APPROVER', roleName: '결재자', userCount: 1,
    description: '전표 결재·승인 권한',
    permissions: ['전표결재함 처리', '전표 승인·반려', '결재 이력 조회'],
  },
  {
    roleCode: 'VIEWER', roleName: '열람자', userCount: 2,
    description: '조회 전용 권한 (입력·수정 불가)',
    permissions: ['대시보드 조회', '장부·원장 조회', '재무제표 조회'],
  },
];

let seq = 1;
function fm(menuCode: string, parentCode: string | null, menuType: 'GROUP' | 'MENU', name: string, path: string | null, screenId: string | null, sortOrder: number, requiresStepUp = false): FlatMenu {
  return { id: `M-${String(seq++).padStart(3, '0')}`, menuCode, parentCode, channel: 'TENANT', menuType, name, path, screenId, sortOrder, isVisible: true, requiresStepUp };
}

export const mockFlatMenus: FlatMenu[] = [
  fm('TN-00', null, 'GROUP', '홈·현황', null, null, 1),
  fm('TN-00-01', 'TN-00', 'MENU', '대시보드', '/dashboard', 'TN-00', 1),
  fm('TN-02', null, 'GROUP', '기초정보관리', null, null, 2),
  fm('TN-02-01', 'TN-02', 'MENU', '회사등록', '/basic/company', 'SA-BAS-01', 1),
  fm('TN-02-02', 'TN-02', 'MENU', '부서·사원관리', '/basic/departments', 'SA-BAS-04', 2),
  fm('TN-02-03', 'TN-02', 'MENU', '거래처관리', '/basic/partners', 'SA-BAS-06', 3),
  fm('TN-02-04', 'TN-02', 'MENU', '계정과목관리', '/basic/accounts', 'SA-BAS-07', 4),
  fm('TN-02-05', 'TN-02', 'MENU', '환경설정', '/basic/settings', 'SA-BAS-03', 5),
  fm('TN-03', null, 'GROUP', '전기이월·개시잔액', null, null, 3),
  fm('TN-03-01', 'TN-03', 'MENU', '전기분재무상태표', '/opening/bs', 'SA-OPN-01', 1),
  fm('TN-03-02', 'TN-03', 'MENU', '거래처별초기이월', '/opening/partner', 'SA-OPN-05', 2),
  fm('TN-04', null, 'GROUP', '전표입력·결재', null, null, 4),
  fm('TN-04-01', 'TN-04', 'MENU', '일반전표입력', '/journal/general', 'SA-JNL-01', 1),
  fm('TN-04-02', 'TN-04', 'MENU', '매입매출전표입력', '/journal/purchase-sales', 'SA-JNL-02', 2),
  fm('TN-04-03', 'TN-04', 'MENU', '전표결재함', '/journal/approval', 'SA-JNL-03', 3),
  fm('TN-07', null, 'GROUP', '장부·원장', null, null, 5),
  fm('TN-07-01', 'TN-07', 'MENU', '분개장', '/ledger/journal-book', 'SA-LDG-01', 1),
  fm('TN-07-02', 'TN-07', 'MENU', '현금출납장', '/ledger/cash-book', 'SA-LDG-02', 2),
  fm('TN-07-03', 'TN-07', 'MENU', '계정별원장', '/ledger/account', 'SA-LDG-03', 3),
  fm('TN-07-04', 'TN-07', 'MENU', '거래처원장', '/ledger/partner', 'SA-LDG-04', 4),
  fm('TN-08', null, 'GROUP', '마감·결산·재무제표', null, null, 6, true),
  fm('TN-08-01', 'TN-08', 'MENU', '합계잔액시산표', '/closing/trial-balance', 'SA-CLS-01', 1),
  fm('TN-08-02', 'TN-08', 'MENU', '재무상태표', '/closing/balance-sheet', 'SA-CLS-02', 2),
  fm('TN-08-03', 'TN-08', 'MENU', '손익계산서', '/closing/income-statement', 'SA-CLS-03', 3),
  fm('TN-08-04', 'TN-08', 'MENU', '마감관리', '/closing/manage', 'SA-CLS-20', 4, true),
  fm('TN-09', null, 'GROUP', '부가세·신고', null, null, 7),
  fm('TN-09-01', 'TN-09', 'MENU', '부가가치세신고서', '/vat/return', 'SA-VAT-01', 1),
  fm('TN-09-02', 'TN-09', 'MENU', '세금계산서합계표', '/vat/tax-invoice-sum', 'SA-VAT-03', 2),
  fm('TN-15', null, 'GROUP', '데이터관리', null, null, 8),
  fm('TN-15-01', 'TN-15', 'MENU', '삭제전표복구', '/data/restore', 'SA-DAT-01', 1),
  fm('TN-15-02', 'TN-15', 'MENU', '데이터백업·복원', '/data/backup', 'SA-DAT-02', 2),
  fm('SYS', null, 'GROUP', '시스템관리', null, null, 9),
  fm('SYS-01', 'SYS', 'MENU', '사용자관리', '/system/users', 'OP-06A', 1),
  fm('SYS-02', 'SYS', 'MENU', '메뉴관리', '/system/menus', 'OP-06D', 2),
  fm('SYS-03', 'SYS', 'MENU', '역할·권한관리', '/system/roles', 'OP-06C', 3),
  fm('SYS-04', 'SYS', 'MENU', '공통코드관리', '/system/codes', 'OP-05C', 4),
  fm('SEC', null, 'GROUP', '보안·개인정보', null, null, 10),
  fm('SEC-01', 'SEC', 'MENU', '감사로그', '/security/audit-logs', 'OP-10A', 1),
  fm('SEC-02', 'SEC', 'MENU', '개인정보 접근로그', '/security/privacy-logs', 'OP-07B', 2),
  fm('SEC-03', 'SEC', 'MENU', '로그인 이력', '/security/login-history', 'OP-10B', 3),
  fm('SEC-04', 'SEC', 'MENU', '마스킹 정책', '/security/masking-policies', 'OP-10C', 4),
];
