import type { DashboardSummary } from '../../types';

export const mockDashboardSummary: DashboardSummary = {
  stats: {
    pendingJournals: 12,
    monthlyJournals: 248,
    closingStatus: '2026-06 가마감',
    activeUsers: 5,
  },
  taxSchedules: [
    { name: '부가가치세 확정신고', dueDate: '2026-07-25', dday: 'D-16', status: '진행중' },
    { name: '원천세 신고', dueDate: '2026-07-10', dday: 'D-1', status: '긴급' },
    { name: '지급명세서 제출', dueDate: '2026-07-31', dday: 'D-22', status: '대기' },
    { name: '법인세 중간예납', dueDate: '2026-08-31', dday: 'D-53', status: '대기' },
    { name: '사업장현황신고', dueDate: '2027-02-10', dday: 'D-216', status: '대기' },
  ],
  recentLogins: [
    { loginId: 'admin', name: '김관리', ip: '10.0.12.34', loginAt: '2026-07-09 08:52', result: 'SUCCESS' },
    { loginId: 'acct01', name: '이회계', ip: '10.0.12.51', loginAt: '2026-07-09 08:47', result: 'SUCCESS' },
    { loginId: 'tax01', name: '박세무', ip: '10.0.12.62', loginAt: '2026-07-09 08:31', result: 'SUCCESS' },
    { loginId: 'unknown', name: '-', ip: '203.0.113.7', loginAt: '2026-07-09 03:12', result: 'FAIL' },
    { loginId: 'view01', name: '최열람', ip: '10.0.12.77', loginAt: '2026-07-08 18:02', result: 'SUCCESS' },
  ],
  notices: [
    { title: '2026년 7월 부가가치세 확정신고 안내', date: '2026-07-01' },
    { title: '시스템 정기점검: 7/12(일) 02:00~04:00', date: '2026-06-30' },
    { title: '개인정보 접근권한 정기 검토 실시', date: '2026-06-25' },
    { title: 'BK 회계시스템 v0.1 프레임워크 오픈', date: '2026-06-20' },
  ],
};
