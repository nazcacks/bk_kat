/**
 * 시스템관리자 운영 콘솔 mock 데이터
 * 원본: 설계/페이즈_화면/시스템관리자_화면_v1.0.HTML 목업 예시 행
 */

// ── OP-01 운영 현황 대시보드 ─────────────────────────────────
export const opsDashboardRows = [
  { area: '배치', status: '지연', tone: 'b-warn', count: 3, event: 'VAT_RECON_DAILY 18분 지연 · worker-07 재시작 필요', action: 'OP-09 이동' },
  { area: '보안', status: '주의', tone: 'b-block', count: 5, event: '비정상 시간대 관리자 접근 2건 · 대량 다운로드 임계 근접', action: 'OP-10 분석' },
  { area: '인증', status: '확인', tone: 'b-warn', count: 4, event: 'MFA 미등록 운영자 4명 · D-3 차단 예정', action: 'OP-06B 통지' },
  { area: '메뉴/권한', status: '정상', tone: 'b-ok', count: 1, event: 'MenuVersion v42 발행 완료 · 캐시 무효화 100%', action: '감사 이력' },
];

// ── OP-03 테넌트 인프라 ─────────────────────────────────────
export const tenantInfraRows = [
  { tenant: 'T-10035', name: '금명전자', tier: 'SCHEMA', status: 'ACTIVE', tone: 'b-ok', quota: 'DB 62% · Jobs 4/10', snapshot: '2026-07-08 03:00', verify: 'checksum OK', verifyTone: 'b-ok' },
  { tenant: 'T-10110', name: 'EDPR Korea', tier: 'DEDICATED', status: 'MIGRATING', tone: 'b-warn', quota: 'Storage 78%', snapshot: '2026-07-07 23:30', verify: 'CDC_SYNC 92%', verifyTone: '' },
  { tenant: 'T-10201', name: 'Inteva Korea', tier: 'SHARED', status: 'ACTIVE', tone: 'b-ok', quota: 'API 38%', snapshot: '2026-07-08 03:00', verify: 'PITR ready', verifyTone: 'b-ok' },
];

// ── OP-06A 사용자 관리 ──────────────────────────────────────
export const adminUserRows = [
  { type: 'OPERATOR', loginId: 'sec.admin@ey.com', name: '김시스템', org: '시스템운영팀', status: 'ACTIVE', statusTone: 'b-ok', mfa: 'WebAuthn', mfaTone: 'b-ok', role: 'SEC_ADMIN · 보안운영팀', lastLogin: '2026-07-08 13:52' },
  { type: 'OPERATOR', loginId: 'ops.junior@ey.com', name: '박운영', org: '고객지원팀', status: 'PASSWORD_EXPIRED', statusTone: 'b-warn', mfa: '미등록', mfaTone: 'b-block', role: 'SUPPORT · 고객지원', lastLogin: '2026-06-21' },
  { type: 'TENANT', loginId: 'acct@kum.co.kr', name: '이회계', org: '금명전자', status: 'ACTIVE', statusTone: 'b-ok', mfa: 'TOTP', mfaTone: 'b-ok', role: '회계팀 · TENANT_ADMIN', lastLogin: '2026-07-08 09:31' },
];

export const userSecurityRows = [
  { item: 'MFA', status: '미등록', tone: 'b-block', detail: '등록 기한 2026-07-11 · 핵심 메뉴 차단 예정', action: '초기화 링크 발송' },
  { item: '활성 세션', status: '2개', tone: 'b-warn', detail: 'Chrome Seoul · Edge Busan', action: '강제 종료' },
  { item: '신뢰기기', status: '1개', tone: 'b-ok', detail: 'Windows Hello 등록', action: '해제' },
  { item: '로그인 이력', status: '최근 실패 3회', tone: '', detail: '비정상 시간대 없음', action: '감사로그 보기' },
];

// ── OP-06G 사용자그룹 관리 ──────────────────────────────────
export const userGroupTree = [
  { label: '보안운영팀', count: '12명', level: 1, on: true },
  { label: 'Break-glass 승인자', count: '3명', level: 2 },
  { label: '감사로그 열람자', count: '6명', level: 2 },
  { label: '고객지원팀', count: '28명', level: 1 },
  { label: '지원 VIEW 전용', count: '18명', level: 2 },
];

export const groupMemberRows = [
  { sel: true, name: '김시스템', loginId: 'sec.admin@ey.com', type: 'OPERATOR', role: 'SEC_ADMIN', policy: 'OP-10 ALLOW · OP-12 ALLOW · OP-08 DENY', start: '2026-01-01', end: '상시', status: 'ACTIVE', tone: 'b-ok' },
  { sel: false, name: '정감사', loginId: 'auditor@ey.com', type: 'OPERATOR', role: 'AUDITOR', policy: 'OP-10 READ · OP-12 READ · EXPORT DENY', start: '2026-01-01', end: '2026-12-31', status: 'ACTIVE', tone: 'b-ok' },
  { sel: false, name: '임보안', loginId: 'security.temp@ey.com', type: 'OPERATOR', role: 'SEC_ADMIN', policy: 'Break-glass review ALLOW', start: '2026-07-01', end: '2026-07-31', status: 'TEMP', tone: 'b-warn' },
];

export const groupMenuPolicyRows = [
  { menu: 'OP-10 로그 관리', rolePerm: 'ALLOW', policy: 'ALLOW', tone: 'b-ok', visible: '보임', enter: '가능', reason: '보안운영팀 기본 메뉴' },
  { menu: 'OP-12 개인정보보호', rolePerm: 'ALLOW', policy: 'ALLOW', tone: 'b-ok', visible: '보임', enter: 'Step-up 후', reason: '개인정보 정책설정·실행로그' },
  { menu: 'OP-08 기장 워크벤치', rolePerm: 'ALLOW', policy: 'DENY', tone: 'b-block', visible: '숨김', enter: '불가', reason: 'SEC_ADMIN 기장 업무 분리' },
  { menu: 'OP-06D 메뉴 마스터', rolePerm: 'ALLOW', policy: 'INHERIT', tone: 'b-gray', visible: '보임', enter: '가능', reason: 'RoleMenuPermission 상속' },
  { menu: 'OP-07 녹화 재생', rolePerm: 'READ', policy: 'ALLOW+승인', tone: 'b-warn', visible: '보임', enter: '승인 후', reason: '2인 승인 필요' },
];

// ── OP-06C Role·권한 관리 ───────────────────────────────────
export const permissionEvalRows = [
  { step: '1 메뉴 버전', target: 'MenuVersion v42', result: 'PUBLISHED', tone: 'b-ok', basis: '런타임 기준' },
  { step: '2 그룹 메뉴권한', target: '보안운영팀 · OP-08', result: 'DENY', tone: 'b-block', basis: 'UserGroupMenuPermission' },
  { step: '3 Role 메뉴권한', target: 'SEC_ADMIN · OP-10', result: 'ALLOW', tone: 'b-ok', basis: 'RoleMenuPermission' },
  { step: '4 ACTION', target: 'KEY_ROTATE', result: 'Step-up', tone: 'b-warn', basis: 'MenuActionGrant.requiresStepUp' },
  { step: '5 데이터범위', target: 'tenant=ALL', result: 'VIEW only', tone: 'b-ok', basis: 'DataScopeRule' },
  { step: '6 민감정보', target: 'PII plain view', result: 'DENY', tone: 'b-block', basis: 'SensitiveDataGrant 없음' },
];

// ── OP-09 배치·연계 운영 ────────────────────────────────────
export const batchJobRows = [
  { job: 'VAT_RECON_DAILY', tenant: 'T-10035', status: 'RETRY', tone: 'b-warn', cause: 'connector timeout', idemKey: 'idem-8841', retry: '가능', retryTone: 'b-ok' },
  { job: 'BANK_SCRAPE_SYNC', tenant: 'T-10201', status: 'DLQ', tone: 'b-block', cause: 'OAuth token expired', idemKey: 'idem-9012', retry: '토큰 회전 후', retryTone: 'b-warn' },
  { job: 'REPORT_EXPORT', tenant: 'ALL', status: 'SUCCESS', tone: 'b-ok', cause: '—', idemKey: 'idem-7770', retry: '—', retryTone: '' },
];

// ── OP-10 로그 관리 ─────────────────────────────────────────
export const integratedLogRows = [
  { time: '2026-07-09 09:41', logType: 'AdminAccessLog', actor: 'ops.junior@ey.com', target: 'T-10035', action: 'SUPPORT_SESSION · 권한 설정 지원', traceId: 'trc-8821', integrity: 'OK', tone: 'b-ok' },
  { time: '2026-07-09 09:32', logType: 'PersonalDataAccessLog', actor: 'auditor@ey.com', target: 'employee.ssn', action: '평문 조회 · 세무조사 대응', traceId: 'trc-8814', integrity: 'OK', tone: 'b-ok' },
  { time: '2026-07-09 09:11', logType: 'DataChangeLog', actor: 'sec.admin@ey.com', target: 'RoleAssignment', action: '권한 변경 · 승인번호 APR-771', traceId: 'trc-8802', integrity: 'OK', tone: 'b-ok' },
  { time: '2026-07-09 08:54', logType: 'SecurityEvent', actor: 'ops.junior@ey.com', target: 'OP-06B', action: '비정상 시간대 접근 · 추가 인증', traceId: 'trc-8799', integrity: '검토', tone: 'b-warn' },
  { time: '2026-07-09 02:00', logType: 'SystemLog', actor: 'system', target: 'VAT_RECON_DAILY', action: '배치 완료 · 132 tenants', traceId: 'trc-8710', integrity: 'OK', tone: 'b-ok' },
];

export const hashChainRows = [
  { chainId: 'ALC-20260709-09', range: '09:00~09:59', rootHash: 'root#20260709-09', verifiedAt: '2026-07-09 10:00', status: 'OK', tone: 'b-ok', action: '증적 보존' },
  { chainId: 'ALC-20260709-08', range: '08:00~08:59', rootHash: 'root#20260709-08', verifiedAt: '2026-07-09 09:00', status: '검토', tone: 'b-warn', action: '비정상 시간대 접근 포함' },
  { chainId: 'ALC-20260709-02', range: '02:00~02:59', rootHash: 'root#20260709-02', verifiedAt: '2026-07-09 03:00', status: 'OK', tone: 'b-ok', action: '배치 로그 검증 완료' },
];

export const auditReportRows = [
  { id: 'LOG-RPT-20260709-01', name: '관리자 접근 감사 리포트', period: '2026-07-01~09', creator: 'sec.admin@ey.com', createdAt: '2026-07-09 10:10', status: '완료', tone: 'b-ok' },
  { id: 'LOG-RPT-20260709-02', name: '개인정보 접근 로그 리포트', period: '2026-07-01~09', creator: 'auditor@ey.com', createdAt: '2026-07-09 10:20', status: '생성중', tone: 'b-warn' },
  { id: 'LOG-RPT-20260708-03', name: '보안 이벤트 리포트', period: '2026-07-08', creator: 'system', createdAt: '2026-07-08 23:00', status: '완료', tone: 'b-ok' },
];

// ── OP-12 개인정보보호 ──────────────────────────────────────
export const privacyPolicyRows = [
  { id: 'PDC-001', kind: '카탈로그', target: 'employee.rrn', purpose: '원천세·4대보험 신고', protection: '암호화+마스킹', approval: '2인', status: 'ACTIVE', tone: 'b-ok' },
  { id: 'MSK-001', kind: '마스킹', target: 'employee.rrn · 전 화면', purpose: '목록·보고서 보호', protection: '앞 6자리 + ******', approval: '평문 Step-up', status: 'ACTIVE', tone: 'b-ok' },
  { id: 'RET-PII-05Y', kind: '보존·파기', target: '개인정보 일반', purpose: '계약 종료 후 보존', protection: '5년 후 분리보관→파기', approval: '2인', status: 'ACTIVE', tone: 'b-ok' },
  { id: 'DLP-BULK-PII', kind: 'DLP', target: '다운로드/Excel', purpose: '대량 유출 방지', protection: '1,000건/10MB 임계', approval: '승인', status: '검토', tone: 'b-warn' },
];

export const privacyChannelRows = [
  { channel: '화면', screen: '전 화면', role: 'ALL', rule: '앞 6자리 + ******', plain: '승인 후 10분' },
  { channel: 'Excel', screen: '다운로드', role: 'AUDITOR', rule: '기본 마스킹', plain: '원칙 금지' },
  { channel: '녹화', screen: '접근 세션', role: 'SUPPORT', rule: '전체 마스킹', plain: '불가' },
];

export const privacyExecLogRows = [
  { time: '2026-07-09 09:32', logType: 'PersonalDataAccessLog', policyId: 'MSK-001', user: 'auditor@ey.com', target: 'employee.rrn 12건', result: '승인대기', tone: 'b-warn', traceId: 'trc-8814' },
  { time: '2026-07-09 09:29', logType: 'MaskingApplyLog', policyId: 'MSK-001', user: 'auditor@ey.com', target: 'Excel 다운로드', result: '마스킹 적용', tone: 'b-ok', traceId: 'trc-8812' },
  { time: '2026-07-09 08:45', logType: 'DlpEventLog', policyId: 'DLP-BULK-PII', user: 'support@ey.com', target: '개인정보 940건', result: '임계 근접', tone: 'b-warn', traceId: 'trc-8791' },
  { time: '2026-07-08 23:10', logType: 'DataDestructionLog', policyId: 'RET-PII-05Y', user: 'system', target: '만료 임시파일 38건', result: '파기완료', tone: 'b-ok', traceId: 'trc-8610' },
];

// ── OP-07 Break-glass·접근 ──────────────────────────────────
export const accessSessionRows = [
  { session: 'BG-20260708-014', tenant: 'T-10035', mode: 'BREAK_GLASS', modeTone: 'b-block', reason: '신고마감 전 DB 라우팅 장애', recording: 'ON · 마스킹', recordingTone: 'b-ok', approval: '2/2' },
  { session: 'AS-20260708-221', tenant: 'T-10201', mode: 'SUPPORT_SESSION', modeTone: '', reason: 'SSO 설정 지원', recording: 'OFF', recordingTone: '', approval: '1/1' },
];
