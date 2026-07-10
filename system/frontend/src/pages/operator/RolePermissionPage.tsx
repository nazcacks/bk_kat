import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { permissionEvalRows } from '../../api/mock/operator';

/** OP-06C Role·권한 관리 — Role CRUD + 권한 평가 시뮬레이션 (DENY 우선) */
export default function RolePermissionPage() {
  const [mode, setMode] = useState('VIEW');

  const crud = useResourceCrud({
    type: 'role',
    title: 'Role',
    fields: [
      { name: 'roleCode', label: 'Role 코드', required: true, readOnlyOnEdit: true, placeholder: 'SEC_ADMIN' },
      { name: 'name', label: 'Role 명', required: true },
      { name: 'scope', label: '범위', type: 'select', options: ['OPERATOR', 'TENANT', 'GLOBAL'] },
      { name: 'description', label: '설명', type: 'textarea' },
    ],
    fallback: [
      { roleCode: 'SEC_ADMIN', name: '시스템 관리자', scope: 'OPERATOR', description: '인프라·인증·보안·감사 운영. 기장 ACTION 불가(SOD)' },
      { roleCode: 'AUDITOR', name: '감사자', scope: 'OPERATOR', description: '로그·리포트 열람 전용' },
      { roleCode: 'SUPPORT', name: '고객 지원', scope: 'OPERATOR', description: 'SUPPORT_SESSION 기반 설정 지원' },
      { roleCode: 'TENANT_ADMIN', name: '회사관리자', scope: 'TENANT', description: '자사 사용자·Role·결재선 관리' },
    ],
    labelOf: (d) => String(d.roleCode),
  });

  const sel = crud.selectedRow?.data as Record<string, string> | undefined;

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
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={crud.openEdit}>저장</ABtn>
            <ABtn>시뮬레이션</ABtn>
          </>
        }
      >
        <QLabel>Role</QLabel>
        <QValue>{sel?.roleCode ?? '-'} <span className="lens">▾</span></QValue>
        <QLabel>사용자/그룹</QLabel>
        <QValue>김시스템/보안운영팀 <span className="lens">⌕</span></QValue>
        <QLabel>접근모드</QLabel>
        <Seg options={['VIEW', 'SUPPORT', 'BREAK']} value={mode} onChange={setMode} />
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane">
          <div className="lp-t">Role 목록 <span className="cnt">{crud.rows.length}건</span></div>
          <div className="ptree">
            {crud.rows.map((row, idx) => {
              const d = row.data as Record<string, string>;
              return (
                <div key={row.id} className={`tnode lv1${crud.selected === idx ? ' on' : ''}`} onClick={() => crud.setSelected(idx)}>
                  {d.roleCode} <span className="cnt">{d.name} · {d.scope}</span>
                </div>
              );
            })}
            {crud.rows.length === 0 && <div className="tnode dim">Role 이 없습니다</div>}
          </div>
        </div>
        <div className="mock-main">
          <div className="formgrid c3 label-left">
            <div className="ff"><label>Role 코드</label><div className="fv ro">{sel?.roleCode ?? '-'}</div></div>
            <div className="ff"><label>Role 명</label><div className="fv ro">{sel?.name ?? '-'}</div></div>
            <div className="ff"><label>범위</label><div className="fv ro">{sel?.scope ?? '-'}</div></div>
            <div className="ff full"><label>설명</label><div className="fv ro">{sel?.description ?? '-'}</div></div>
          </div>
          <div className="qbar">
            <span className="qlabel">권한 평가 시뮬레이션</span>
            <span className="qv">{sel?.roleCode ?? 'SEC_ADMIN'} · 김시스템/보안운영팀 · {mode}</span>
          </div>
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
      {crud.dialog}
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
