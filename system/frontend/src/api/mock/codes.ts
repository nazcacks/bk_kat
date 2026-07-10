import type { CommonCodeGroup } from '../../types';

export const mockCommonCodes: CommonCodeGroup[] = [
  {
    groupCode: 'JNL_TYPE', groupName: '전표유형',
    items: [
      { code: 'GENERAL', name: '일반전표', sortOrder: 1, isActive: true },
      { code: 'PURCHASE', name: '매입전표', sortOrder: 2, isActive: true },
      { code: 'SALES', name: '매출전표', sortOrder: 3, isActive: true },
      { code: 'CLOSING', name: '결산전표', sortOrder: 4, isActive: true },
    ],
  },
  {
    groupCode: 'APPR_STATUS', groupName: '결재상태',
    items: [
      { code: 'DRAFT', name: '작성중', sortOrder: 1, isActive: true },
      { code: 'PENDING', name: '결재대기', sortOrder: 2, isActive: true },
      { code: 'APPROVED', name: '승인', sortOrder: 3, isActive: true },
      { code: 'REJECTED', name: '반려', sortOrder: 4, isActive: true },
    ],
  },
  {
    groupCode: 'PARTNER_TYPE', groupName: '거래처구분',
    items: [
      { code: 'CORP', name: '법인', sortOrder: 1, isActive: true },
      { code: 'INDIV', name: '개인사업자', sortOrder: 2, isActive: true },
      { code: 'PERSON', name: '개인', sortOrder: 3, isActive: true },
      { code: 'FOREIGN', name: '해외', sortOrder: 4, isActive: false },
    ],
  },
  {
    groupCode: 'VAT_TYPE', groupName: '부가세유형',
    items: [
      { code: 'TAXABLE', name: '과세', sortOrder: 1, isActive: true },
      { code: 'ZERO', name: '영세율', sortOrder: 2, isActive: true },
      { code: 'EXEMPT', name: '면세', sortOrder: 3, isActive: true },
      { code: 'NONE', name: '불공제', sortOrder: 4, isActive: true },
    ],
  },
  {
    groupCode: 'USER_STATUS', groupName: '사용자상태',
    items: [
      { code: 'ACTIVE', name: '활성', sortOrder: 1, isActive: true },
      { code: 'LOCKED', name: '잠금', sortOrder: 2, isActive: true },
      { code: 'INACTIVE', name: '비활성', sortOrder: 3, isActive: true },
      { code: 'EXPIRED', name: '만료', sortOrder: 4, isActive: true },
    ],
  },
  {
    groupCode: 'CLOSING_STATUS', groupName: '마감상태',
    items: [
      { code: 'OPEN', name: '미마감', sortOrder: 1, isActive: true },
      { code: 'SOFT', name: '가마감', sortOrder: 2, isActive: true },
      { code: 'HARD', name: '확정마감', sortOrder: 3, isActive: true },
    ],
  },
];
