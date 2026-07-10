/**
 * 운영 콘솔 공통 리소스 초기 데이터
 * (설계/페이즈_화면/시스템관리자_화면_v1.0.HTML 목업 예시 — 프론트 mock 과 동일하게 유지)
 */
export const RESOURCE_SEED: Record<string, Record<string, unknown>[]> = {
  tenant: [
    { tenant: 'T-10035', name: '금명전자', tier: 'SCHEMA', status: 'ACTIVE', quota: 'DB 62% · Jobs 4/10', snapshot: '2026-07-08 03:00', verify: 'checksum OK' },
    { tenant: 'T-10110', name: 'EDPR Korea', tier: 'DEDICATED', status: 'MIGRATING', quota: 'Storage 78%', snapshot: '2026-07-07 23:30', verify: 'CDC_SYNC 92%' },
    { tenant: 'T-10201', name: 'Inteva Korea', tier: 'SHARED', status: 'ACTIVE', quota: 'API 38%', snapshot: '2026-07-08 03:00', verify: 'PITR ready' },
  ],
  'user-group': [
    { groupCode: 'SEC-OPS', nameKo: '보안운영팀', nameEn: 'Security Operations', groupType: 'SECURITY', ownerScope: 'OPERATOR', status: 'ACTIVE', parentGroup: null, defaultRole: 'SEC_ADMIN', memberCount: 12, description: '보안·감사 운영 및 Break-glass 승인 권한을 가진 운영자 그룹' },
    { groupCode: 'CS-TEAM', nameKo: '고객지원팀', nameEn: 'Customer Support', groupType: 'OPERATOR_ORG', ownerScope: 'OPERATOR', status: 'ACTIVE', parentGroup: null, defaultRole: 'SUPPORT', memberCount: 28, description: '이용회사 지원 세션을 수행하는 운영자 그룹' },
  ],
  'auth-policy': [
    { policyCode: 'OPERATOR-DEFAULT', target: '운영자', version: 'v18', status: 'PUBLISHED', mfa: '필수 · WebAuthn/TOTP', password: '최소 10자 · 90일 변경', lockout: '5회 실패 → LOCKED', session: '유휴 30분 · 절대 12시간', concurrentSessions: '운영자 2개', dormant: '365일 미접속', sso: 'IdP: EY-Okta · SCIM provisioning ON' },
    { policyCode: 'TENANT-FLOOR', target: '테넌트', version: 'v6', status: 'PUBLISHED', mfa: '필수(하한) · TOTP 이상', password: '최소 10자 · 90일 변경', lockout: '5회 실패 → LOCKED', session: '유휴 30분 · 절대 12시간', concurrentSessions: '3개', dormant: '365일 미접속', sso: '테넌트 IdP 연동 선택' },
  ],
  role: [
    { roleCode: 'SEC_ADMIN', name: '시스템 관리자', scope: 'OPERATOR', description: '인프라·인증·보안·감사 운영. 기장 작성·승인·마감·신고 ACTION 불가(SOD)' },
    { roleCode: 'AUDITOR', name: '감사자', scope: 'OPERATOR', description: '로그·리포트 열람 전용, EXPORT 는 승인 필요' },
    { roleCode: 'SUPPORT', name: '고객 지원', scope: 'OPERATOR', description: 'SUPPORT_SESSION 기반 설정 지원, 마스킹 조회만' },
    { roleCode: 'TENANT_ADMIN', name: '회사관리자', scope: 'TENANT', description: '자사 사용자·Role·결재선·환경설정 관리' },
  ],
  'batch-job': [
    { job: 'VAT_RECON_DAILY', tenant: 'T-10035', status: 'RETRY', cause: 'connector timeout', idemKey: 'idem-8841', retry: '가능' },
    { job: 'BANK_SCRAPE_SYNC', tenant: 'T-10201', status: 'DLQ', cause: 'OAuth token expired', idemKey: 'idem-9012', retry: '토큰 회전 후' },
    { job: 'REPORT_EXPORT', tenant: 'ALL', status: 'SUCCESS', cause: '—', idemKey: 'idem-7770', retry: '—' },
  ],
  'access-session': [
    { session: 'BG-20260708-014', tenant: 'T-10035', mode: 'BREAK_GLASS', reason: '신고마감 전 DB 라우팅 장애', recording: 'ON · 마스킹', approval: '2/2', status: 'ACTIVE' },
    { session: 'AS-20260708-221', tenant: 'T-10201', mode: 'SUPPORT_SESSION', reason: 'SSO 설정 지원', recording: 'OFF', approval: '1/1', status: 'REVIEWED' },
  ],
  'group-menu-permission': [
    { groupCode: 'SEC-OPS', permissions: { 'OP-06': 'ALLOW', 'OP-07': 'ALLOW', 'OP-08': 'DENY', 'OP-10': 'ALLOW', 'OP-12': 'ALLOW' } },
    { groupCode: 'CS-TEAM', permissions: { 'OP-00': 'ALLOW', 'OP-01': 'ALLOW', 'OP-08': 'DENY', 'OP-10': 'DENY', 'OP-12': 'DENY' } },
  ],
  'privacy-policy': [
    { policyId: 'PDC-001', kind: '카탈로그', target: 'employee.rrn', purpose: '원천세·4대보험 신고', protection: '암호화+마스킹', approval: '2인', status: 'ACTIVE' },
    { policyId: 'MSK-001', kind: '마스킹', target: 'employee.rrn · 전 화면', purpose: '목록·보고서 보호', protection: '앞 6자리 + ******', approval: '평문 Step-up', status: 'ACTIVE' },
    { policyId: 'RET-PII-05Y', kind: '보존·파기', target: '개인정보 일반', purpose: '계약 종료 후 보존', protection: '5년 후 분리보관→파기', approval: '2인', status: 'ACTIVE' },
    { policyId: 'DLP-BULK-PII', kind: 'DLP', target: '다운로드/Excel', purpose: '대량 유출 방지', protection: '1,000건/10MB 임계', approval: '승인', status: '검토' },
  ],
};
