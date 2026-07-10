import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { permissionEvalRows } from '../../api/mock/operator';

/** OP-06C Role·권한 관리 — 권한 평가 시뮬레이션 (DENY 우선) */
export default function RolePermissionPage() {
  const [mode, setMode] = useState('VIEW');

  return (
    <ScreenShell
      title="Role·권한 관리"
      screenId="OP-06C"
      breadcrumb={['운영콘솔', '사용자·인증·권한', 'Role·권한 관리']}
      titleRight={<span className="badge b-block">DENY 우선</span>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>추가</ABtn>
            <ABtn>수정</ABtn>
            <ABtn variant="red">삭제</ABtn>
            <ABtn variant="dark">저장</ABtn>
            <ABtn>시뮬레이션</ABtn>
          </>
        }
      >
        <QLabel>Role</QLabel>
        <QValue>SEC_ADMIN <span className="lens">▾</span></QValue>
        <QLabel>사용자/그룹</QLabel>
        <QValue>김시스템/보안운영팀 <span className="lens">⌕</span></QValue>
        <QLabel>권한유형</QLabel>
        <QValue>메뉴/ACTION/데이터/민감정보 <span className="lens">▾</span></QValue>
        <QLabel>접근모드</QLabel>
        <Seg options={['VIEW', 'SUPPORT', 'BREAK']} value={mode} onChange={setMode} />
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>평가 단계</th><th>대상</th><th>결과</th><th>근거</th></tr></thead>
              <tbody>
                {permissionEvalRows.map((r, i) => (
                  <tr key={r.step} className={i === 0 ? 'sel' : ''}>
                    <td>{r.step}</td>
                    <td>{r.target}</td>
                    <td><span className={`badge ${r.tone}`}>{r.result}</span></td>
                    <td>{r.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatusBar tone="warn" message="OP-08은 Role 허용이 있어도 그룹 DENY로 미노출" count="PermissionSimulationLog 저장" />
        </div>
        <RightPanel>
          <InfoBox title="SOD">본인 Role 변경 차단<br />작성자/승인자 분리<br />SEC_ADMIN 기장 작성 금지</InfoBox>
          <InfoBox title="캐시 키"><code>userId+roleHash+groupHash+menuVersion</code></InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: 'Role과 사용자그룹 권한을 합산해 실제 메뉴·ACTION·데이터 접근을 통제한다.' },
          { label: '입력 필드', body: 'Role, 사용자, 사용자그룹, MenuVersion, 메뉴, ACTION, 데이터범위, 민감정보 등급.' },
          { label: '기능', body: 'Role 생성/복사, 권한 부여·회수, 그룹 메뉴권한 반영, 시뮬레이션, 캐시 무효화.' },
          { label: '검증', body: '미발행 메뉴, ACTION 단독 권한, SOD, 민감정보 Step-up, 명시적 DENY 우선.' },
          { label: '산출물', body: 'Role, RoleAssignment, RoleMenuPermission, MenuActionGrant, PermissionEvaluationCache.' },
          { label: '연계', body: 'OP-06A/G/D, /api/me/menus, 서버 ACTION API 재검증.' },
        ]}
      />
    </ScreenShell>
  );
}
