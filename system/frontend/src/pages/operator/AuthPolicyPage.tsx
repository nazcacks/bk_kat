import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';

/** OP-06B 인증 정책 관리 — MFA, SSO, WebAuthn, 세션, 계정 잠금 정책 */
export default function AuthPolicyPage() {
  const [target, setTarget] = useState('운영자');

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
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>추가</ABtn>
            <ABtn>수정</ABtn>
            <ABtn variant="red">삭제</ABtn>
            <ABtn variant="dark">저장</ABtn>
          </>
        }
      >
        <QLabel>적용대상</QLabel>
        <Seg options={['운영자', '테넌트', '전체']} value={target} onChange={setTarget} />
        <QLabel>정책버전</QLabel>
        <QValue>AuthPolicy v18 <span className="lens">▾</span></QValue>
        <QLabel>상태</QLabel>
        <QValue>DRAFT/PUBLISHED <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="actionbar">
        <ABtn variant="yellow">정책 검증</ABtn>
        <div className="ab-right">
          <ABtn>변경 Diff</ABtn>
          <ABtn variant="dark">발행</ABtn>
        </div>
      </div>
      <div className="formgrid c3">
        <div className="ff"><label>운영자 2FA</label><div className="fv">필수 · WebAuthn/TOTP</div></div>
        <div className="ff"><label>비밀번호</label><div className="fv">최소 10자 · 90일 변경</div></div>
        <div className="ff"><label>실패 잠금</label><div className="fv">5회 실패 → LOCKED</div></div>
        <div className="ff"><label>세션</label><div className="fv">유휴 30분 · 절대 12시간</div></div>
        <div className="ff"><label>동시 세션</label><div className="fv">운영자 2개</div></div>
        <div className="ff"><label>휴면</label><div className="fv">365일 미접속</div></div>
        <div className="ff full"><label>SSO/OIDC</label><div className="fv">IdP: EY-Okta · SCIM provisioning ON · externalId 충돌 0건</div></div>
      </div>
      <StatusBar message="✓ 정책 변경은 기존 세션과 신규 로그인에 즉시 반영" count="AuthPolicy v18" />
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
