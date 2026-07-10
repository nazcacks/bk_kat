import { useCallback, useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import EditDialog, { type DialogField, type DialogValues } from '../../components/frame/EditDialog';
import { createUser, disableUser, fetchUsers, updateUser } from '../../api/users';
import { userSecurityRows } from '../../api/mock/operator';
import type { ManagedUser, UserDetailProfile } from '../../types';

const statusTone = (s: string) =>
  s === 'ACTIVE' ? 'b-ok' : s === 'LOCKED' || s === 'DISABLED' ? 'b-block' : 'b-warn';

/** 확장 프로필 필드 (설계 OP-06A data-user-field 전체) — 다이얼로그 공용 */
const DETAIL_FIELD_DEFS: DialogField[] = [
  { name: 'nameEn', label: '영문명' },
  { name: 'externalId', label: '사번/외부ID', placeholder: 'EY-OPS-0000' },
  { name: 'operatorOrg', label: '관리회사조직', type: 'select', options: ['SYS-OPS · 시스템운영팀', 'SUPPORT · 고객지원팀', 'BK-OPS · 기장운영팀', 'AUDIT · 감사팀', '- 해당없음'] },
  { name: 'department', label: '부서' },
  { name: 'position', label: '직위' },
  { name: 'primaryBookkeeper', label: '주기장', type: 'select', options: ['관리회사', '이용회사'] },
  { name: 'notify', label: '알림채널', type: 'select', options: ['IN_APP + EMAIL', 'IN_APP', 'EMAIL', 'SMS'] },
  { name: 'locale', label: '언어', type: 'select', options: ['ko-KR', 'en-US'] },
  { name: 'timezone', label: '시간대', type: 'select', options: ['Asia/Seoul', 'UTC'] },
  { name: 'scope', label: '접근범위', type: 'select', options: ['GLOBAL', 'OPERATOR_ORG', 'TENANT_ONLY'] },
  { name: 'startDate', label: '시작일', placeholder: '2026-01-01' },
  { name: 'endDate', label: '종료일', placeholder: '9999-12-31' },
  { name: 'accountExpire', label: '계정만료', placeholder: '9999-12-31' },
  { name: 'defaultGroup', label: '기본그룹', type: 'select', options: ['보안운영팀', '고객지원팀', '기장운영팀', '감사팀', '회계팀', '재무팀'] },
  { name: 'defaultRole', label: '기본Role', type: 'select', options: ['SEC_ADMIN', 'SUPPORT', 'AUDITOR', 'BK_MANAGER', 'BK_PREPARER', 'TENANT_ADMIN', 'VIEWER'] },
  { name: 'roleExpire', label: '권한만료', placeholder: '상시 / 2026-12-31' },
  { name: 'reason', label: '저장사유', type: 'textarea' },
];

const USER_FIELDS: DialogField[] = [
  { name: 'loginId', label: 'Login ID', required: true, readOnlyOnEdit: true, placeholder: 'user@example.com' },
  { name: 'name', label: '성명', required: true },
  { name: 'email', label: '이메일' },
  { name: 'phone', label: '휴대폰', placeholder: '010-0000-0000' },
  { name: 'userGroup', label: '사용자구분', type: 'select', options: ['TENANT', 'OPERATOR'] },
  { name: 'tenantId', label: '이용회사(테넌트)', placeholder: 'T0001 (운영자는 공백)' },
  { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'INVITED', 'LOCKED', 'SUSPENDED', 'DORMANT', 'DISABLED', 'PASSWORD_EXPIRED'] },
  { name: 'roles', label: 'Role (콤마 구분)', placeholder: 'TENANT_ADMIN,VIEWER' },
  ...DETAIL_FIELD_DEFS,
];

const DETAIL_KEYS = DETAIL_FIELD_DEFS.map((f) => f.name) as (keyof UserDetailProfile)[];

/** OP-06A 사용자 관리 — 좌측 목록 / 우측 세부(설계 전체 필드) CRUD (실제 API, 마스킹) */
export default function UserManagementPage() {
  const [tab, setTab] = useState(0);
  const [group, setGroup] = useState('전체');
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [selected, setSelected] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [initial, setInitial] = useState<DialogValues>({});

  const reload = useCallback(() => fetchUsers(1, 50).then((res) => setUsers(res.items)), []);
  useEffect(() => {
    void reload();
  }, [reload]);

  const rows = users.filter((u) => group === '전체' || u.userGroup === group);
  const sel = rows[selected] ?? rows[0];
  const d: UserDetailProfile = sel?.detail ?? {};

  const openCreate = () => {
    setDialogMode('create');
    const init: DialogValues = {
      loginId: '', name: '', email: '', phone: '', userGroup: 'TENANT', tenantId: 'T0001', status: 'ACTIVE', roles: '',
    };
    DETAIL_FIELD_DEFS.forEach((f) => {
      init[f.name] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
    });
    init.startDate = '2026-01-01';
    init.endDate = '9999-12-31';
    init.accountExpire = '9999-12-31';
    init.roleExpire = '상시';
    setInitial(init);
    setDialogOpen(true);
  };

  const openEdit = () => {
    if (!sel) return window.alert('수정할 사용자를 선택하세요.');
    setDialogMode('edit');
    const init: DialogValues = {
      loginId: sel.loginId, name: sel.name, email: '', phone: '',
      userGroup: sel.userGroup, tenantId: sel.tenantId ?? '', status: sel.status, roles: sel.roles.join(','),
    };
    DETAIL_KEYS.forEach((k) => {
      init[k] = (sel.detail?.[k] as string) ?? '';
    });
    setInitial(init);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!sel) return window.alert('삭제할 사용자를 선택하세요.');
    if (!window.confirm(`'${sel.loginId}' 계정을 비활성(DISABLED) 처리하시겠습니까?\n물리 삭제는 하지 않으며 감사로그에 기록됩니다.`)) return;
    try {
      await disableUser(sel.id);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  const handleSubmit = async (values: DialogValues) => {
    const detail: Record<string, unknown> = {};
    DETAIL_KEYS.forEach((k) => {
      if (String(values[k] ?? '').trim()) detail[k] = String(values[k]);
    });
    const payload: Partial<ManagedUser> = {
      loginId: String(values.loginId),
      name: String(values.name),
      userGroup: String(values.userGroup),
      tenantId: String(values.tenantId ?? '') || undefined,
      status: String(values.status),
      roles: String(values.roles ?? '').split(',').map((r) => r.trim()).filter(Boolean),
      detail: detail as UserDetailProfile,
    };
    if (String(values.email ?? '').trim()) payload.email = String(values.email);
    if (String(values.phone ?? '').trim()) payload.phone = String(values.phone);
    if (dialogMode === 'create') await createUser(payload);
    else if (sel) await updateUser(sel.id, payload);
    await reload();
  };

  return (
    <ScreenShell
      title="사용자 관리"
      screenId="OP-06A"
      breadcrumb={['운영콘솔', '사용자·인증·권한', '사용자 관리']}
      titleRight={<><span className="badge b-gray">Step-up 유효 07:12</span> · 👤 SEC_ADMIN</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>사용자 목록·세부정보 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>보안·세션 <span className="tno">2</span></div>
      </div>

      {tab === 0 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow" onClick={() => void reload()}>🔍 조회</ABtn>
                <ABtn onClick={openCreate}>추가</ABtn>
                <ABtn onClick={openEdit}>수정</ABtn>
                <ABtn variant="red" onClick={() => void handleDelete()}>삭제</ABtn>
                <ABtn variant="dark" onClick={openEdit}>저장</ABtn>
                <ABtn>초대메일 발송</ABtn>
              </>
            }
          >
            <QLabel>검색어</QLabel>
            <QValue><input placeholder="이름/loginId/소속" /> <span className="lens">⌕</span></QValue>
            <QLabel>사용자그룹</QLabel>
            <Seg options={['전체', 'OPERATOR', 'TENANT']} value={group} onChange={(v) => { setGroup(v); setSelected(0); }} />
            <QLabel>상태</QLabel>
            <QValue>ACTIVE/LOCKED/DISABLED <span className="lens">▾</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="lpane user-list-pane">
              <div className="lp-t">사용자 목록 <span className="cnt">{rows.length}명</span></div>
              <div className="gridwrap" style={{ overflowY: 'auto', flex: 1 }}>
                <table className="grid">
                  <thead>
                    <tr><th>이름</th><th>Login ID</th><th>구분</th><th className="c">상태</th></tr>
                  </thead>
                  <tbody>
                    {rows.map((u, i) => (
                      <tr key={u.id} className={`clickable${i === selected ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                        <td>{u.name}</td>
                        <td>{u.loginId}</td>
                        <td>{u.userGroup}</td>
                        <td className="c"><span className={`badge ${statusTone(u.status)}`}>{u.status}</span></td>
                      </tr>
                    ))}
                    {rows.length === 0 && <tr><td colSpan={4} className="dim">사용자가 없습니다</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mock-main">
              <div className="qbar">
                <span className="qlabel">선택 사용자</span>
                <span className="qv">{sel ? `${sel.name} (${sel.loginId})` : '좌측 목록에서 선택'}</span>
                <span className="qlabel">구분</span>
                <span className="qv">{sel?.userGroup ?? '-'}</span>
                <span className="qlabel">상태</span>
                <span className="qv">{sel?.status ?? '-'}</span>
              </div>
              {sel ? (
                <>
                  <div className="formgrid c3 label-left">
                    <div className="ff"><label>사용자ID</label><div className="fv ro">{d.userIdCode ?? sel.id}</div></div>
                    <div className="ff"><label>Login ID</label><div className="fv ro">{sel.loginId}</div></div>
                    <div className="ff"><label>사용자구분</label><div className="fv ro">{sel.userGroup}</div></div>
                    <div className="ff"><label>상태</label><div className="fv ro">{sel.status}</div></div>
                    <div className="ff"><label>성명</label><div className="fv ro">{sel.name}</div></div>
                    <div className="ff"><label>영문명</label><div className="fv ro">{d.nameEn ?? '-'}</div></div>
                    <div className="ff"><label>사번/외부ID</label><div className="fv ro">{d.externalId ?? '-'}</div></div>
                    <div className="ff"><label>관리회사조직</label><div className="fv ro">{d.operatorOrg ?? '-'}</div></div>
                    <div className="ff"><label>이용회사</label><div className="fv ro">{sel.tenantId ?? '- 전체/해당없음'}</div></div>
                    <div className="ff"><label>부서</label><div className="fv ro">{d.department ?? '-'}</div></div>
                    <div className="ff"><label>직위</label><div className="fv ro">{d.position ?? '-'}</div></div>
                    <div className="ff"><label>주기장</label><div className="fv ro">{d.primaryBookkeeper ?? '-'}</div></div>
                    <div className="ff"><label>이메일</label><div className="fv ro">{sel.email}</div></div>
                    <div className="ff"><label>휴대폰</label><div className="fv ro">{sel.phone}</div></div>
                    <div className="ff"><label>알림채널</label><div className="fv ro">{d.notify ?? '-'}</div></div>
                    <div className="ff"><label>언어</label><div className="fv ro">{d.locale ?? '-'}</div></div>
                    <div className="ff"><label>시간대</label><div className="fv ro">{d.timezone ?? '-'}</div></div>
                    <div className="ff"><label>접근범위</label><div className="fv ro">{d.scope ?? '-'}</div></div>
                    <div className="ff"><label>시작일</label><div className="fv ro">{d.startDate ?? '-'}</div></div>
                    <div className="ff"><label>종료일</label><div className="fv ro">{d.endDate ?? '-'}</div></div>
                    <div className="ff"><label>계정만료</label><div className="fv ro">{d.accountExpire ?? '-'}</div></div>
                    <div className="ff"><label>기본그룹</label><div className="fv ro">{d.defaultGroup ?? '-'}</div></div>
                    <div className="ff"><label>기본Role</label><div className="fv ro">{d.defaultRole ?? sel.roles.join(', ')}</div></div>
                    <div className="ff"><label>권한만료</label><div className="fv ro">{d.roleExpire ?? '-'}</div></div>
                    <div className="ff"><label>최근 로그인</label><div className="fv ro">{sel.lastLoginAt ? String(sel.lastLoginAt).slice(0, 16).replace('T', ' ') : '-'}</div></div>
                    <div className="ff full"><label>저장사유</label><div className="fv ro">{d.reason ?? '-'}</div></div>
                  </div>
                  <div className="gridwrap">
                    <table className="grid">
                      <thead>
                        <tr><th>배정유형</th><th>그룹/Role</th><th>데이터범위</th><th>시작일</th><th>종료일</th><th className="c">상태</th></tr>
                      </thead>
                      <tbody>
                        {(d.assignments ?? []).map((a, i) => (
                          <tr key={i} className={i === 0 ? 'sel' : ''}>
                            <td>{a[0]}</td><td>{a[1]}</td><td>{a[2]}</td><td>{a[3]}</td><td>{a[4]}</td>
                            <td className="c"><span className={`badge ${a[5] === 'ACTIVE' ? 'b-ok' : 'b-warn'}`}>{a[5]}</span></td>
                          </tr>
                        ))}
                        {(d.assignments ?? []).length === 0 && (
                          <tr><td colSpan={6} className="dim">배정 내역이 없습니다</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="formgrid"><div className="ff full"><div className="fv ro">좌측 목록에서 사용자를 선택하면 세부정보가 표시됩니다.</div></div></div>
              )}
              <StatusBar message="✓ loginId 중복 없음 · 소속/연락처/권한 배정 저장 가능 — 개인정보는 기본 마스킹" count="UserDetail · UserGroupMember · RoleAssignment" />
            </div>
            <RightPanel>
              <InfoBox title="선택 사용자">
                {sel ? (
                  <>
                    <KV k="loginId" v={sel.loginId} />
                    <KV k="구분" v={sel.userGroup} />
                    <KV k="상태" v={sel.status} />
                    <KV k="MFA" v={sel.userGroup === 'OPERATOR' ? 'WebAuthn' : 'TOTP'} />
                  </>
                ) : '목록에서 사용자를 선택하세요'}
              </InfoBox>
              <InfoBox title="저장 검증"><KV k="loginId" v="UNIQUE" /><KV k="상태전이" v="유효" /><KV k="SOD" v="통과" /></InfoBox>
              <InfoBox title="변경 이력">
                {(d.history ?? []).length > 0
                  ? (d.history ?? []).map((h) => <div key={h}>· {h}</div>)
                  : '이력이 없습니다'}
              </InfoBox>
              <InfoBox title="가능 조치">
                <ABtn small>MFA 초기화</ABtn> <ABtn small>세션 종료</ABtn><br />
                <span className="badge b-block">본인 조치 차단</span>
              </InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">🔍 조회</ABtn>
                <ABtn>본인확인 완료</ABtn>
                <ABtn variant="dark">MFA 초기화 요청</ABtn>
              </>
            }
          >
            <QLabel>사용자</QLabel>
            <QValue>{sel?.loginId ?? '-'} <span className="lens">⌕</span></QValue>
            <QLabel>보안상태</QLabel>
            <QValue>MFA 미등록/잠금/실패 <span className="lens">▾</span></QValue>
            <QLabel>기간</QLabel>
            <QValue>최근 30일 <span className="lens">📅</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>보안 항목</th><th>상태</th><th>상세</th><th>조치</th></tr></thead>
                  <tbody>
                    {userSecurityRows.map((r, i) => (
                      <tr key={r.item} className={i === 0 ? 'sel' : ''}>
                        <td>{r.item}</td>
                        <td>{r.tone ? <span className={`badge ${r.tone}`}>{r.status}</span> : r.status}</td>
                        <td>{r.detail}</td>
                        <td>{r.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar tone="warn" message="MFA 초기화는 Step-up + 승인자 필요" count="UserSecurityAction 기록" />
            </div>
            <RightPanel>
              <InfoBox title="상태 전이">
                <span className="chip">INVITED</span> → <span className="chip on">ACTIVE</span> → <span className="chip">LOCKED</span> → <span className="chip">DISABLED</span>
              </InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      <EditDialog
        open={dialogOpen}
        mode={dialogMode}
        title="사용자"
        fields={USER_FIELDS}
        initial={initial}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
      <ScreenDetails
        items={[
          { label: '목적', body: '운영자와 이용회사 사용자 계정의 기본정보, 소속, 연락처, 상태, 그룹·Role 상속, 보안 조치를 관리한다.' },
          { label: '입력 필드', body: 'userId, loginId, userType, status, 성명/영문명, 사번/externalId, operatorOrgId/homeTenantId, 부서, 직위, 연락처, locale, timezone, 접근범위, 시작/종료일, 기본그룹, 기본Role, 저장사유.' },
          { label: '기능', body: '사용자 추가·수정·삭제·저장, 초대메일 발송, 그룹/Role 배정, 상태 변경, MFA 초기화, 세션 종료, 권한 미리보기.' },
          { label: '검증', body: 'loginId 중복, 사용자구분별 소속 필수, 기간 유효성, 상태전이, SOD, 본인 보안 조치, SCIM 충돌을 차단.' },
          { label: '산출물', body: 'User, UserDetail, OperatorUser/TenantUser, UserGroupMember, RoleAssignment, UserSecurityAction, UserAuditLog.' },
          { label: '연계', body: 'UserGroup, RoleAssignment, MfaDevice, UserSession, LoginHistory, PermissionEvaluationCache.' },
        ]}
      />
    </ScreenShell>
  );
}
