import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { updateResource } from '../../api/resources';
import { batchJobRows } from '../../api/mock/operator';

const statusTone = (s: string) =>
  s === 'SUCCESS' ? 'b-ok' : s === 'DLQ' || s === 'DEAD_LETTER' || s === 'FAILED' ? 'b-block' : 'b-warn';

/** OP-09 배치·연계 운영 — 배치, 큐, DLQ, 재처리 (CRUD) */
export default function BatchIntegrationPage() {
  const [statusFilter, setStatusFilter] = useState('전체');

  const crud = useResourceCrud({
    type: 'batch-job',
    title: '배치 잡',
    fields: [
      { name: 'job', label: 'Job 이름', required: true, placeholder: 'VAT_RECON_DAILY' },
      { name: 'tenant', label: '테넌트', placeholder: 'T-10000 / ALL' },
      { name: 'status', label: '상태', type: 'select', options: ['SUCCESS', 'RETRY', 'FAILED', 'DLQ'] },
      { name: 'cause', label: '실패 원인' },
      { name: 'idemKey', label: '멱등키', placeholder: 'idem-0000' },
      { name: 'retry', label: '재처리 조건' },
    ],
    fallback: batchJobRows.map((r) => ({ job: r.job, tenant: r.tenant, status: r.status, cause: r.cause, idemKey: r.idemKey, retry: r.retry })),
    labelOf: (d) => String(d.job),
  });

  const visible = crud.rows.filter((r) => statusFilter === '전체' || r.data.status === statusFilter);

  /** 선택 재처리 — 상태를 SUCCESS 로 갱신 (멱등키 검증은 서버 확장 예정) */
  const retrySelected = async () => {
    if (!crud.selectedRow) return window.alert('재처리할 잡을 선택하세요.');
    const d = crud.selectedRow.data as Record<string, string>;
    if (d.status === 'SUCCESS') return window.alert('이미 성공한 잡입니다.');
    if (!window.confirm(`'${d.job}' (멱등키 ${d.idemKey}) 을 재처리하시겠습니까?`)) return;
    try {
      await updateResource('batch-job', crud.selectedRow.id, { status: 'SUCCESS', cause: '—', retry: '—' });
      await crud.reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '재처리에 실패했습니다.');
    }
  };

  return (
    <ScreenShell
      title="배치·연계 운영"
      screenId="OP-09"
      breadcrumb={['운영콘솔', '운영·배치·연계 모니터링', '배치·연계 운영']}
      titleRight={<>worker 24/28 · DLQ 12</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void retrySelected()}>선택 재처리</ABtn>
          </>
        }
      >
        <QLabel>기간</QLabel>
        <QValue>오늘 00:00~현재 <span className="lens">📅</span></QValue>
        <QLabel>상태</QLabel>
        <Seg options={['전체', 'RETRY', 'FAILED', 'DLQ', 'SUCCESS']} value={statusFilter} onChange={setStatusFilter} />
        <QLabel>테넌트</QLabel>
        <QValue><input placeholder="tenantId/전체" /> <span className="lens">⌕</span></QValue>
        <QLabel>멱등키</QLabel>
        <QValue><input placeholder="idem-*" /> <span className="lens">⌕</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>Job</th><th>Tenant</th><th>상태</th><th>실패 원인</th><th>멱등키</th><th>재처리 조건</th></tr></thead>
              <tbody>
                {visible.map((row) => {
                  const d = row.data as Record<string, string>;
                  const idx = crud.rows.indexOf(row);
                  return (
                    <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                      <td>{d.job}</td>
                      <td>{d.tenant}</td>
                      <td><span className={`badge ${statusTone(d.status)}`}>{d.status}</span></td>
                      <td>{d.cause}</td>
                      <td className="mono">{d.idemKey}</td>
                      <td>{d.retry}</td>
                    </tr>
                  );
                })}
                {visible.length === 0 && <tr><td colSpan={6} className="dim">해당 상태의 잡이 없습니다</td></tr>}
              </tbody>
            </table>
          </div>
          <StatusBar tone="warn" message="동일 멱등키 + 동일 요청 해시일 때만 재처리 허용" count={`잡 ${visible.length}건`} />
        </div>
        <RightPanel>
          <InfoBox title="재처리 게이트">Step-up · 사유 · 멱등키 · 데이터 반영 여부 검증</InfoBox>
          <InfoBox title="커넥터">토큰 만료 D-2 · 평문 secret 조회 금지 · KMS secretRef만 표시</InfoBox>
        </RightPanel>
      </div>
      {crud.dialog}
      <ScreenDetails
        items={[
          { label: '목적', body: '운영/회사/기장/보고 배치와 연계 큐의 실패·지연을 관측하고 재처리한다.' },
          { label: '조회 조건', body: '배치군, 상태, 테넌트, 실패 원인, 멱등키, 워커, 커넥터 상태.' },
          { label: '기능', body: 'DLQ 조회, 원인 요약, 재처리, 토큰/인증서 만료 알림, 워커 상태 모니터링.' },
          { label: '검증', body: '멱등키 충돌, 데이터 반영 중복, Step-up, 사유, 평문 secret 접근 금지.' },
          { label: '처리 결과', body: 'ScrapingTask, IntegrationStaging, AsyncReportJob, IntegrationLog 갱신.' },
          { label: '연계', body: 'ConnectorVaultService, DistributedLockService, NotificationService, OP-10 보안 이벤트.' },
        ]}
      />
    </ScreenShell>
  );
}
