import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { fetchUsers } from '../../api/users';
import { userSecurityRows } from '../../api/mock/operator';
import type { ManagedUser } from '../../types';

const statusTone = (s: string) =>
  s === 'ACTIVE' ? 'b-ok' : s === 'LOCKED' || s === 'DISABLED' ? 'b-block' : 'b-warn';

/** OP-06A 사용자 관리 — OperatorUser/TenantUser 계정 생명주기와 보안 상태 (실제 API 연동) */
export default function UserManagementPage() {
  const [tab, setTab] = useState(0);
  const [group, setGroup] = useState('전체');
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    void fetchUsers(1, 50).then((res) => setUsers(res.items));
  }, []);

  const rows = users.filter((u) => group === '전체' || u.userGroup === group);
  const sel = rows[selected] ?? rows[0];

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
                <ABtn variant="yellow">🔍 조회</ABtn>
                <ABtn>추가</ABtn>
                <ABtn>수정</ABtn>
                <ABtn variant="red">삭제</ABtn>
                <ABtn variant="dark">저장</ABtn>
              </>
            }
          >
            <QLabel>검색어</QLabel>
            <QValue><input placeholder="이름/loginId/소속" /> <span className="lens">⌕</span></QValue>
            <QLabel>사용자그룹</QLabel>
            <Seg options={['전체', 'OPERATOR', 'TENANT']} value={group} onChange={(v) => { setGroup(v); setSelected(0); }} />
            <QLabel>상태</QLabel>
            <QValue>ACTIVE/LOCKED/DISABLED <span className="lens">▾</span></QValue>
            <QLabel>MFA</QLabel>
            <QValue>미등록 포함 <span className="lens">▾</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead>
                    <tr><th>구분</th><th>Login ID</th><th>이름</th><th>소속</th><th className="c">상태</th><th>이메일(마스킹)</th><th>연락처(마스킹)</th><th>Role</th><th>최근 로그인</th></tr>
                  </thead>
                  <tbody>
                    {rows.map((u, i) => (
                      <tr key={u.id} className={`clickable${i === selected ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                        <td>{u.userGroup}</td>
                        <td>{u.loginId}</td>
                        <td>{u.name}</td>
                        <td>{u.tenantId ?? '관리회사'}</td>
                        <td className="c"><span className={`badge ${statusTone(u.status)}`}>{u.status}</span></td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.roles.join(', ')}</td>
                        <td>{u.lastLoginAt ? String(u.lastLoginAt).slice(0, 16).replace('T', ' ') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar tone="warn" message="개인정보는 기본 마스킹 — 평문 조회는 사유 입력 후 PersonalDataAccessLog에 기록" count={`사용자 ${rows.length}명`} />
              {sel && (
                <div className="formgrid c3 label-left">
                  <div className="ff"><label>사용자ID</label><div className="fv ro">{sel.id}</div></div>
                  <div className="ff"><label>Login ID</label><div className="fv ro">{sel.loginId}</div></div>
                  <div className="ff"><label>사용자구분</label><div className="fv ro">{sel.userGroup}</div></div>
                  <div className="ff"><label>상태</label><div className="fv ro">{sel.status}</div></div>
                  <div className="ff"><label>성명</label><div className="fv ro">{sel.name}</div></div>
                  <div className="ff"><label>이용회사</label><div className="fv ro">{sel.tenantId ?? '- 해당없음'}</div></div>
                  <div className="ff"><label>이메일</label><div className="fv ro">{sel.email}</div></div>
                  <div className="ff"><label>휴대폰</label><div className="fv ro">{sel.phone}</div></div>
                  <div className="ff"><label>기본Role</label><div className="fv ro">{sel.roles.join(', ')}</div></div>
                </div>
              )}
            </div>
            <RightPanel>
              <InfoBox title="선택 사용자">
                {sel ? (
                  <>
                    <KV k="loginId" v={sel.loginId} />
                    <KV k="구분" v={sel.userGroup} />
                    <KV k="상태" v={sel.status} />
                  </>
                ) : '목록에서 사용자를 선택하세요'}
              </InfoBox>
              <InfoBox title="저장 검증"><KV k="loginId" v="UNIQUE" /><KV k="상태전이" v="유효" /><KV k="SOD" v="통과" /></InfoBox>
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
            <QValue>ops.junior@ey.com <span className="lens">⌕</span></QValue>
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
