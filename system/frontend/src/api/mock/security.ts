import type { AuditLog, LoginHistory, MaskingPolicy, Paged, PrivacyAccessLog } from '../../types';

function paged<T>(items: T[], page: number, size: number): Paged<T> {
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, size, total: items.length };
}

const actions = ['LOGIN', 'READ', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'APPROVE'];
const resources = ['journal', 'partner', 'account', 'user', 'closing', 'vat-return', 'menu'];
const menuCodes = ['TN-04-01', 'TN-02-03', 'TN-02-04', 'SYS-01', 'TN-08-04', 'TN-09-01', 'SYS-02'];
const people = [
  { loginId: 'admin', name: '김관리' },
  { loginId: 'acct01', name: '이회계' },
  { loginId: 'tax01', name: '박세무' },
  { loginId: 'appr01', name: '정결재' },
  { loginId: 'view01', name: '최열람' },
];

function fakeHash(seed: number): string {
  let h = '';
  let x = seed * 2654435761 % 4294967296;
  for (let i = 0; i < 16; i++) {
    x = (x * 1103515245 + 12345) % 4294967296;
    h += (x % 16).toString(16);
    h += ((x >> 8) % 16).toString(16);
    h += ((x >> 16) % 16).toString(16);
    h += ((x >> 24) % 16).toString(16);
  }
  return h;
}

function ts(i: number): string {
  const base = new Date('2026-07-09T09:30:00');
  base.setMinutes(base.getMinutes() - i * 17);
  return base.toISOString().slice(0, 19).replace('T', ' ');
}

const allAuditLogs: AuditLog[] = Array.from({ length: 87 }, (_, i) => {
  const p = people[i % people.length];
  return {
    id: `AUD-${String(1000 - i).padStart(4, '0')}`,
    createdAt: ts(i),
    loginId: p.loginId,
    userName: p.name,
    action: actions[i % actions.length],
    resource: resources[i % resources.length],
    menuCode: menuCodes[i % menuCodes.length],
    ip: `10.0.12.${30 + (i % 60)}`,
    result: i % 13 === 5 ? 'FAIL' : 'SUCCESS',
    chainHash: fakeHash(i + 7),
  };
});

const targetTypes = ['사용자', '거래처', '사원'];
const targetNames = ['홍길동', '김민수', '이서연', '㈜한빛상사', '박지훈', '대한물류㈜', '최수진'];
const dataItemSets = [
  ['이름', '휴대전화'],
  ['이름', '이메일', '휴대전화'],
  ['주민등록번호'],
  ['이름', '계좌번호'],
  ['이름', '이메일'],
  ['사업자등록번호', '대표자명'],
];
const purposes = ['급여 지급 처리', '거래처 정보 확인', '세무신고 자료 작성', '사용자 계정 관리', '원천세 신고 검토', '연말정산 자료 확인'];
const accessTypes = ['VIEW', 'VIEW', 'EXPORT', 'VIEW', 'PRINT'];

const allPrivacyLogs: PrivacyAccessLog[] = Array.from({ length: 54 }, (_, i) => {
  const p = people[i % people.length];
  return {
    id: `PRV-${String(900 - i).padStart(4, '0')}`,
    createdAt: ts(i * 2),
    loginId: p.loginId,
    userName: p.name,
    targetType: targetTypes[i % targetTypes.length],
    targetName: targetNames[i % targetNames.length],
    dataItems: dataItemSets[i % dataItemSets.length],
    purpose: purposes[i % purposes.length],
    accessType: accessTypes[i % accessTypes.length],
  };
});

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/126.0',
];

const allLoginHistories: LoginHistory[] = Array.from({ length: 63 }, (_, i) => {
  const p = i % 11 === 7 ? { loginId: 'unknown', name: '-' } : people[i % people.length];
  return {
    id: `LGN-${String(800 - i).padStart(4, '0')}`,
    loginAt: ts(i * 3),
    loginId: p.loginId,
    name: p.name,
    ip: i % 11 === 7 ? '203.0.113.7' : `10.0.12.${30 + (i % 60)}`,
    userAgent: userAgents[i % userAgents.length],
    result: i % 11 === 7 ? 'FAIL' : 'SUCCESS',
  };
});

export const mockMaskingPolicies: MaskingPolicy[] = [
  { id: 'MSK-01', dataType: '성명', fieldName: 'name', maskPattern: '홍*동', description: '두 번째 글자부터 마지막 글자 전까지 마스킹', isActive: true },
  { id: 'MSK-02', dataType: '이메일', fieldName: 'email', maskPattern: 'ab***@domain.com', description: '로컬파트 앞 2자 외 마스킹', isActive: true },
  { id: 'MSK-03', dataType: '휴대전화', fieldName: 'phone', maskPattern: '010-****-1234', description: '중간 4자리 마스킹', isActive: true },
  { id: 'MSK-04', dataType: '주민등록번호', fieldName: 'rrn', maskPattern: '123456-*******', description: '뒷자리 전체 마스킹', isActive: true },
  { id: 'MSK-05', dataType: '계좌번호', fieldName: 'accountNo', maskPattern: '110-***-****89', description: '중간 자리 마스킹, 끝 2자리 노출', isActive: true },
  { id: 'MSK-06', dataType: '카드번호', fieldName: 'cardNo', maskPattern: '1234-****-****-5678', description: '중간 8자리 마스킹', isActive: false },
];

export function mockAuditLogs(page: number, size: number): Paged<AuditLog> {
  return paged(allAuditLogs, page, size);
}
export function mockPrivacyLogs(page: number, size: number): Paged<PrivacyAccessLog> {
  return paged(allPrivacyLogs, page, size);
}
export function mockLoginHistories(page: number, size: number): Paged<LoginHistory> {
  return paged(allLoginHistories, page, size);
}
