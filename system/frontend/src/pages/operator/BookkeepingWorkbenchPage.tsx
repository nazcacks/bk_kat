import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { updateResource } from '../../api/resources';

/** 전환 워크플로 상태 (설계 §12.2 BOOKKEEPING_SWITCH_STATUS) */
const FLOW = ['REQUESTED', 'COUNTERPARTY_CONSENTED', 'SCHEDULED', 'SWITCHED'];
const statusTone = (s: string) =>
  s === 'SWITCHED' ? 'b-ok' : s === 'REJECTED' || s === 'CANCELLED' ? 'b-block' : 'b-warn';

/** OP-08 기장 전환 워크플로우 (BF-03) — 기장모드 3종·전환 요청 처리 (설계 §21) */
export default function BookkeepingWorkbenchPage() {
  const crud = useResourceCrud({
    type: 'bookkeeping-switch',
    title: '기장 전환 요청',
    fields: [
      { name: 'tenant', label: '이용회사', required: true, placeholder: 'T-10035 금명전자' },
      { name: 'currentMode', label: '현재 모드', type: 'select', options: ['OPERATOR_LED', 'TENANT_LED', 'HYBRID'] },
      { name: 'requestedMode', label: '요청 모드', type: 'select', options: ['OPERATOR_LED', 'TENANT_LED', 'HYBRID'] },
      { name: 'reason', label: '전환 사유', type: 'textarea', required: true },
      { name: 'scheduledDate', label: '전환 예정일', placeholder: '2026-08-01' },
      { name: 'status', label: '상태', type: 'select', options: [...FLOW, 'REJECTED', 'CANCELLED'] },
    ],
    fallback: [
      { tenant: 'T-10035 금명전자', currentMode: 'OPERATOR_LED', requestedMode: 'HYBRID', reason: '전표 자체 수행, 마감·신고는 관리회사', scheduledDate: '2026-08-01', status: 'COUNTERPARTY_CONSENTED' },
    ],
    labelOf: (d) => `${d.tenant} (${d.currentMode}→${d.requestedMode})`,
  });

  const sel = crud.selectedRow;
  const d = (sel?.data ?? {}) as Record<string, string>;

  /** 워크플로 전이 (설계: 상대 동의 → 예약 → 전환, 반려 가능) */
  const transition = async (next: string, label: string) => {
    if (!sel) return window.alert('처리할 요청을 선택하세요.');
    const cur = String(d.status);
    const order = FLOW.indexOf(cur);
    if (next !== 'REJECTED' && FLOW.indexOf(next) !== order + 1) {
      return window.alert(`현재 상태(${cur})에서 '${label}' 처리할 수 없습니다.\n워크플로: ${FLOW.join(' → ')}`);
    }
    if (!window.confirm(`'${d.tenant}' 전환 요청을 [${label}] 처리하시겠습니까?`)) return;
    try {
      const patch: Record<string, string> = { status: next };
      if (next === 'SWITCHED') patch.currentMode = String(d.requestedMode);
      await updateResource('bookkeeping-switch', sel.id, patch);
      await crud.reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '처리에 실패했습니다.');
    }
  };

  return (
    <ScreenShell
      title="기장 전환 워크플로우"
      screenId="OP-08"
      breadcrumb={['운영콘솔', '기장 워크벤치', '기장 전환 워크플로우']}
      titleRight={<>OPERATOR_LED / TENANT_LED / HYBRID</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>전환 요청</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void crud.save()}>저장</ABtn>
          </>
        }
      >
        <QLabel>이용회사</QLabel>
        <QValue><input placeholder="tenantId/회사명" /> <span className="lens">⌕</span></QValue>
        <QLabel>선택</QLabel>
        <QValue>{sel ? `${d.tenant} · ${d.status}` : '-'}</QValue>
      </QueryBar>
      <div className="fnbar">
        {FLOW.map((f, i) => (
          <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span className={`chip${d.status === f ? ' on' : ''}`}>{f}</span>
            {i < FLOW.length - 1 && <span className="ar">→</span>}
          </span>
        ))}
        <div className="sumbox">
          <ABtn small onClick={() => void transition('COUNTERPARTY_CONSENTED', '상대 동의')}>상대 동의</ABtn>
          <ABtn small onClick={() => void transition('SCHEDULED', '전환 예약')}>전환 예약</ABtn>
          <ABtn small variant="dark" onClick={() => void transition('SWITCHED', '전환 완료')}>전환 완료</ABtn>
          <ABtn small variant="red" onClick={() => void transition('REJECTED', '반려')}>반려</ABtn>
        </div>
      </div>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>이용회사</th><th className="c">현재 모드</th><th className="c">요청 모드</th><th>전환 사유</th><th>예정일</th><th className="c">상태</th></tr></thead>
              <tbody>
                {crud.rows.map((row, idx) => {
                  const r = row.data as Record<string, string>;
                  return (
                    <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                      <td>{r.tenant}</td>
                      <td className="c"><span className="badge b-gray">{r.currentMode}</span></td>
                      <td className="c"><span className="badge b-new">{r.requestedMode}</span></td>
                      <td>{r.reason}</td>
                      <td>{r.scheduledDate}</td>
                      <td className="c"><span className={`badge ${statusTone(r.status)}`}>{r.status}</span></td>
                    </tr>
                  );
                })}
                {crud.rows.length === 0 && <tr><td colSpan={6} className="dim">전환 요청이 없습니다 — [전환 요청] 으로 등록하세요</td></tr>}
              </tbody>
            </table>
          </div>
          {crud.form}
          <StatusBar
            tone="warn"
            message="전환 완료 시 현재 모드가 요청 모드로 갱신되고 권한·결재선이 재평가됩니다 — 마감·신고 진행 중에는 전환 차단"
            count={`전환 요청 ${crud.rows.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="기장 모드 3종 (설계 §21)">
            <KV k="OPERATOR_LED" v="관리회사 주도" />
            <KV k="TENANT_LED" v="이용회사 자체" />
            <KV k="HYBRID" v="업무 분담" />
          </InfoBox>
          <InfoBox title="HYBRID 분담 기준">전표유형 / 거래원천 / 계정범위 / 모듈 (BOOKKEEPING_SCOPE_TYPE)</InfoBox>
          <InfoBox title="전환 게이트">상대방 동의 필수 · 개시잔액 검증 · 진행 중 결재 정리 · 인계(Handover) 기록</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '이용회사별 기장 모드(관리회사 주도/자체/혼합)와 전환 요청 워크플로를 운영한다.' },
          { label: '입력 필드', body: '이용회사, 현재/요청 모드, 전환 사유, 예정일, 상태.' },
          { label: '기능', body: '전환 요청 CRUD, 상대 동의→예약→전환 워크플로 처리, 반려, 인계 기록.' },
          { label: '검증', body: '워크플로 순서 강제, 상대방 동의 필수, 마감·신고 진행 중 전환 차단.' },
          { label: '산출물', body: 'BookkeepingConfig, BookkeepingModeChangeRequest, BookkeepingHandover, TenantAcknowledgement.' },
          { label: '연계', body: 'OP-02 담당 배정, OP-00 접근모드(BOOKKEEPING), TN-01 회사 설정.' },
        ]}
      />
    </ScreenShell>
  );
}
