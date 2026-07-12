import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { createResource, listResources, type ResourceRow } from '../../api/resources';

const MODES = [
  { code: 'VIEW', label: 'VIEW', desc: '조회 지원 — 마스킹 조회만, 즉시 시작' },
  { code: 'SUPPORT_SESSION', label: 'SUPPORT', desc: '설정 지원 — 시간 제한(4시간), 사유 필수' },
  { code: 'BOOKKEEPING', label: 'BOOKKEEPING', desc: '기장 수행 — 기장계약+담당배정 필수, 상시' },
  { code: 'BREAK_GLASS', label: 'BREAK_GLASS', desc: '긴급대행 — 2인 승인·세션 녹화·사후검토' },
];

interface TenantData { tenant?: string; name?: string; tier?: string; status?: string }

/** OP-00 운영 진입 (BF-00) — 이용회사 선택 + 접근모드 + 사유 → 접근 세션 시작 (설계 §5) */
export default function OperationEntryPage() {
  const [tenants, setTenants] = useState<ResourceRow<TenantData>[]>([]);
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState('VIEW');
  const [reason, setReason] = useState('');
  const [current, setCurrent] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    void listResources<TenantData>('tenant', [
      { tenant: 'T-10035', name: '금명전자', tier: 'SCHEMA', status: 'ACTIVE' },
    ]).then(setTenants);
    const saved = localStorage.getItem('bk-access-mode');
    if (saved) {
      try {
        const v = JSON.parse(saved) as { session?: string; tenant?: string; mode?: string };
        setCurrent(`${v.session} · ${v.tenant} · ${v.mode}`);
      } catch { /* ignore */ }
    }
  }, []);

  const sel = tenants[selected];
  const modeInfo = MODES.find((m) => m.code === mode);

  const startSession = async () => {
    if (!sel) return window.alert('이용회사를 먼저 선택하세요.');
    if (mode !== 'VIEW' && reason.trim().length < 2) {
      return window.alert('VIEW 외 접근모드는 접근 사유 입력이 필수입니다. (설계 §5)');
    }
    const d = sel.data;
    const sessionId = `${mode === 'BREAK_GLASS' ? 'BG' : 'AS'}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now() % 1000).padStart(3, '0')}`;
    setStarting(true);
    try {
      await createResource('access-session', {
        session: sessionId,
        tenant: String(d.tenant),
        mode,
        reason: reason.trim() || '조회 지원',
        recording: mode === 'BREAK_GLASS' ? 'ON · 마스킹' : 'OFF',
        approval: mode === 'BREAK_GLASS' ? '0/2' : '1/1',
        status: mode === 'BREAK_GLASS' ? 'REQUESTED' : 'ACTIVE',
      });
      const banner = { session: sessionId, tenant: `${d.tenant} ${d.name}`, mode, reason: reason.trim() || '조회 지원' };
      localStorage.setItem('bk-access-mode', JSON.stringify(banner));
      setCurrent(`${sessionId} · ${banner.tenant} · ${mode}`);
      window.alert(
        mode === 'BREAK_GLASS'
          ? `긴급대행 요청이 접수되었습니다 (${sessionId}).\n2인 승인 후 활성화되며, 세션은 녹화·사후검토됩니다.`
          : `접근 세션이 시작되었습니다 (${sessionId}).\nOP-07 접근 거버넌스에서 세션을 확인할 수 있습니다.`,
      );
      setReason('');
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '세션 시작에 실패했습니다.');
    } finally {
      setStarting(false);
    }
  };

  return (
    <ScreenShell
      title="이용회사 선택"
      screenId="OP-00"
      breadcrumb={['운영콘솔', '운영 진입', '이용회사 선택']}
      titleRight={<>미배정 회사 미노출 · 모든 접근은 AdminAccessLog 기록</>}
    >
      <QueryBar
        actions={<ABtn variant="yellow">🔍 조회</ABtn>}
      >
        <QLabel>회사 검색</QLabel>
        <QValue><input placeholder="회사명/tenantId" /> <span className="lens">⌕</span></QValue>
        <QLabel>정렬</QLabel>
        <QValue>마감 임박 우선 <span className="lens">▾</span></QValue>
        <QLabel>현재 세션</QLabel>
        <QValue off>{current ?? '없음'}</QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane user-list-pane">
          <div className="lp-t">담당 이용회사 <span className="cnt">{tenants.length}개</span></div>
          <div className="gridwrap" style={{ overflowY: 'auto', flex: 1 }}>
            <table className="grid">
              <thead><tr><th>Tenant</th><th>회사명</th><th className="c">상태</th></tr></thead>
              <tbody>
                {tenants.map((row, i) => {
                  const d = row.data;
                  return (
                    <tr key={row.id} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                      <td className="mono">{String(d.tenant)}</td>
                      <td>{String(d.name)}</td>
                      <td className="c"><span className={`badge ${d.status === 'ACTIVE' ? 'b-ok' : 'b-warn'}`}>{String(d.status)}</span></td>
                    </tr>
                  );
                })}
                {tenants.length === 0 && <tr><td colSpan={3} className="dim">담당 배정된 회사가 없습니다</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mock-main">
          <div className="qbar">
            <span className="qlabel">선택 회사</span>
            <span className="qv">{sel ? `${sel.data.tenant} ${sel.data.name}` : '좌측에서 선택'}</span>
            <span className="qlabel">접근모드</span>
            <Seg options={MODES.map((m) => m.label)} value={modeInfo?.label ?? 'VIEW'} onChange={(l) => setMode(MODES.find((m) => m.label === l)?.code ?? 'VIEW')} />
          </div>
          <div className="formgrid c2 label-left">
            <div className="ff"><label>모드 설명</label><div className="fv ro">{modeInfo?.desc}</div></div>
            <div className="ff"><label>세션 제한</label><div className="fv ro">{mode === 'VIEW' ? '유휴 30분' : mode === 'SUPPORT_SESSION' ? '최대 4시간 · 자동 회수' : mode === 'BOOKKEEPING' ? '상시 (담당 배정 기간)' : '승인 후 최대 2시간 · 녹화'}</div></div>
            <div className="ff full">
              <label>접근 사유{mode !== 'VIEW' ? ' *' : ''}</label>
              <textarea className="fv" rows={2} value={reason} placeholder={mode === 'VIEW' ? '(선택) 조회 지원' : '접근 사유를 입력하세요 — AdminAccessSession 에 기록됩니다'} onChange={(e) => setReason(e.target.value)} />
            </div>
          </div>
          <div className="actionbar">
            <span className="chip">{mode === 'BREAK_GLASS' ? 'Step-up + 2인 승인 필요' : 'Step-up 재인증 필요'}</span>
            <div className="ab-right">
              <ABtn variant="dark" onClick={() => void startSession()}>{starting ? '시작 중…' : '🔓 접근 세션 시작'}</ABtn>
            </div>
          </div>
          <StatusBar
            message="접근모드 배너가 모든 화면 상단에 고정 표시되며, 세션은 OP-07 접근 거버넌스에서 관리됩니다"
            count="AdminAccessSession · AdminAccessLog append-only"
          />
        </div>
        <RightPanel>
          <InfoBox title="접근모드 4종 (설계 §5)">
            {MODES.map((m) => <KV key={m.code} k={m.label} v={m.code === 'BREAK_GLASS' ? '2인 승인·녹화' : m.code === 'BOOKKEEPING' ? '계약+배정 필수' : m.code === 'SUPPORT_SESSION' ? '시간 제한' : '마스킹 조회'} />)}
          </InfoBox>
          <InfoBox title="가드레일">미배정 회사 접근 불가<br />기장 Role 보유자는 해당 회사 Break-glass 승인자 겸직 금지(SOD)</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '담당 배정된 이용회사를 선택하고 접근모드·사유와 함께 운영 세션을 시작한다.' },
          { label: '입력 필드', body: '이용회사, 접근모드(VIEW/SUPPORT_SESSION/BOOKKEEPING/BREAK_GLASS), 접근 사유.' },
          { label: '기능', body: '회사 검색·선택, 접근모드 선택, Step-up 확인, 세션 시작, 접근모드 배너 표시.' },
          { label: '검증', body: '미배정 회사 미노출, VIEW 외 사유 필수, Break-glass 는 옵트인+2인 승인+시간제한.' },
          { label: '산출물', body: 'AdminAccessSession, AdminAccessLog(append-only), BreakGlassRequest.' },
          { label: '연계', body: 'OP-07 접근 거버넌스, OP-08 기장 워크벤치, SecurityEvent, 접근모드 배너.' },
        ]}
      />
    </ScreenShell>
  );
}
