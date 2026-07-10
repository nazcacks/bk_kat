import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { batchJobRows } from '../../api/mock/operator';

/** OP-09 배치·연계 운영 — 배치, 큐, DLQ, 워커, 커넥터 볼트 상태 */
export default function BatchIntegrationPage() {
  const [status, setStatus] = useState('FAILED');
  const [selected, setSelected] = useState(0);

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
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn variant="dark">선택 재처리</ABtn>
          </>
        }
      >
        <QLabel>기간</QLabel>
        <QValue>오늘 00:00~현재 <span className="lens">📅</span></QValue>
        <QLabel>상태</QLabel>
        <Seg options={['FAILED', 'RETRY', 'DEAD_LETTER']} value={status} onChange={setStatus} />
        <QLabel>배치군</QLabel>
        <QValue>운영/회사/기장/보고 <span className="lens">▾</span></QValue>
        <QLabel>테넌트</QLabel>
        <QValue><input placeholder="tenantId/전체" /> <span className="lens">⌕</span></QValue>
        <QLabel>멱등키</QLabel>
        <QValue><input placeholder="idem-*" /> <span className="lens">⌕</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>Job</th><th>Tenant</th><th>상태</th><th>실패 원인</th><th>멱등키</th><th className="c">재처리</th></tr></thead>
              <tbody>
                {batchJobRows.map((r, i) => (
                  <tr key={r.job} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                    <td>{r.job}</td>
                    <td>{r.tenant}</td>
                    <td><span className={`badge ${r.tone}`}>{r.status}</span></td>
                    <td>{r.cause}</td>
                    <td className="mono">{r.idemKey}</td>
                    <td className="c">{r.retryTone ? <span className={`badge ${r.retryTone}`}>{r.retry}</span> : r.retry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatusBar tone="warn" message="동일 멱등키 + 동일 요청 해시일 때만 재처리 허용" count="DLQ 12건" />
        </div>
        <RightPanel>
          <InfoBox title="재처리 게이트">Step-up · 사유 · 멱등키 · 데이터 반영 여부 검증</InfoBox>
          <InfoBox title="커넥터">토큰 만료 D-2 · 평문 secret 조회 금지 · KMS secretRef만 표시</InfoBox>
        </RightPanel>
      </div>
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
