import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';

/** OP-06B 인증 정책 관리 — MFA, SSO, WebAuthn, 세션, 계정 잠금 정책 (CRUD) */
export default function AuthPolicyPage() {
  const [target, setTarget] = useState('전체');

  const crud = useResourceCrud({
    type: 'auth-policy',
    title: '인증 정책',
    fields: [
      { name: 'policyCode', label: '정책코드', required: true, readOnlyOnEdit: true, placeholder: 'OPERATOR-DEFAULT' },
      { name: 'target', label: '적용대상', type: 'select', options: ['운영자', '테넌트', '전체'] },
      { name: 'version', label: '정책버전', placeholder: 'v1' },
      { name: 'status', label: '상태', type: 'select', options: ['DRAFT', 'PUBLISHED', 'RETIRED'] },
      { name: 'mfa', label: '2FA 정책', placeholder: '필수 · WebAuthn/TOTP' },
      { name: 'password', label: '비밀번호', placeholder: '최소 10자 · 90일 변경' },
      { name: 'lockout', label: '실패 잠금', placeholder: '5회 실패 → LOCKED' },
      { name: 'session', label: '세션', placeholder: '유휴 30분 · 절대 12시간' },
      { name: 'concurrentSessions', label: '동시 세션' },
      { name: 'dormant', label: '휴면', placeholder: '365일 미접속' },
      { name: 'sso', label: 'SSO/OIDC', type: 'textarea' },
    ],
    fallback: [
      { policyCode: 'OPERATOR-DEFAULT', target: '운영자', version: 'v18', status: 'PUBLISHED', mfa: '필수 · WebAuthn/TOTP', password: '최소 10자 · 90일 변경', lockout: '5회 실패 → LOCKED', session: '유휴 30분 · 절대 12시간', concurrentSessions: '운영자 2개', dormant: '365일 미접속', sso: 'IdP: EY-Okta · SCIM provisioning ON' },
      { policyCode: 'TENANT-FLOOR', target: '테넌트', version: 'v6', status: 'PUBLISHED', mfa: '필수(하한) · TOTP 이상', password: '최소 10자 · 90일 변경', lockout: '5회 실패 → LOCKED', session: '유휴 30분 · 절대 12시간', concurrentSessions: '3개', dormant: '365일 미접속', sso: '테넌트 IdP 연동 선택' },
    ],
    labelOf: (d) => String(d.policyCode),
  });

  const visible = crud.rows.filter((r) => target === '전체' || r.data.target === target);
  const sel = crud.selectedRow?.data as Record<string, string> | undefined;

  return (
    <ScreenShell
      title="인증 정책"
      screenId="OP-06B"
      breadcrumb={['운영콘솔', '사용자·인증·권한', '인증 정책 관리']}
      titleRight={<span className="badge b-block">Step-up 필요</span>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={crud.openEdit}>저장</ABtn>
          </>
        }
      >
        <QLabel>적용대상</QLabel>
        <Seg options={['전체', '운영자', '테넌트']} value={target} onChange={setTarget} />
        <QLabel>정책버전</QLabel>
        <QValue>{sel ? `AuthPolicy ${sel.version}` : '-'} <span className="lens">▾</span></QValue>
        <QLabel>상태</QLabel>
        <QValue>DRAFT/PUBLISHED <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="gridwrap">
        <table className="grid">
          <thead><tr><th>정책코드</th><th>적용대상</th><th className="c">버전</th><th className="c">상태</th><th>2FA</th><th>비밀번호</th><th>세션</th></tr></thead>
          <tbody>
            {visible.map((row) => {
              const d = row.data as Record<string, string>;
              const idx = crud.rows.indexOf(row);
              return (
                <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                  <td className="mono">{d.policyCode}</td>
                  <td>{d.target}</td>
                  <td className="c">{d.version}</td>
                  <td className="c"><span className={`badge ${d.status === 'PUBLISHED' ? 'b-ok' : 'b-warn'}`}>{d.status}</span></td>
                  <td>{d.mfa}</td>
                  <td>{d.password}</td>
                  <td>{d.session}</td>
                </tr>
              );
            })}
            {visible.length === 0 && <tr><td colSpan={7} className="dim">정책이 없습니다 — [추가] 로 등록하세요</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="formgrid c3">
        <div className="ff"><label>운영자 2FA</label><div className="fv ro">{sel?.mfa ?? '-'}</div></div>
        <div className="ff"><label>비밀번호</label><div className="fv ro">{sel?.password ?? '-'}</div></div>
        <div className="ff"><label>실패 잠금</label><div className="fv ro">{sel?.lockout ?? '-'}</div></div>
        <div className="ff"><label>세션</label><div className="fv ro">{sel?.session ?? '-'}</div></div>
        <div className="ff"><label>동시 세션</label><div className="fv ro">{sel?.concurrentSessions ?? '-'}</div></div>
        <div className="ff"><label>휴면</label><div className="fv ro">{sel?.dormant ?? '-'}</div></div>
        <div className="ff full"><label>SSO/OIDC</label><div className="fv ro">{sel?.sso ?? '-'}</div></div>
      </div>
      <StatusBar message="✓ 정책 변경은 기존 세션과 신규 로그인에 즉시 반영 · 변경 이력은 감사로그 기록" count={sel ? `AuthPolicy ${sel.version}` : `정책 ${visible.length}건`} />
      {crud.dialog}
      <ScreenDetails
        items={[
          { label: '목적', body: '운영 콘솔 인증 강도와 세션/잠금/휴면 정책을 중앙에서 관리한다.' },
          { label: '입력 필드', body: 'MFA 수단, 비밀번호 규칙, 세션 TTL, 동시 세션, SSO/SCIM, 휴면 기준.' },
          { label: '기능', body: '정책 저장, 영향 사용자 확인, MFA 초기화 정책, SSO/WebAuthn 설정.' },
          { label: '검증', body: '운영자 2FA 필수, 위험 작업 Step-up, 약한 테넌트 정책은 floor 아래로 설정 불가.' },
          { label: '산출물', body: 'AuthPolicy, MfaDevice, WebauthnCredential, SsoIdentity, UserSession.' },
          { label: '연계', body: 'OP-06A 사용자 보안 탭, LoginHistory, TrustedDevice, SecurityEvent.' },
        ]}
      />
    </ScreenShell>
  );
}
