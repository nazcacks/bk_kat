import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';

const subTone = (s: string) =>
  s === 'ACTIVE' ? 'b-ok' : s === 'TRIAL' || s === 'GRACE' ? 'b-warn' : s === 'PAST_DUE' || s === 'SUSPENDED' ? 'b-block' : 'b-gray';

/** OP-04 구독·청구·결제 (BF-10) — 구독 상태머신·Invoice·Dunning (설계 §7, §12.2) */
export default function SubscriptionBillingPage() {
  const [tab, setTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState('전체');

  const subCrud = useResourceCrud({
    type: 'subscription',
    title: '구독',
    fields: [
      { name: 'tenant', label: '이용회사', required: true, readOnlyOnEdit: true, placeholder: 'T-10035 금명전자' },
      { name: 'plan', label: '요금제', type: 'select', options: ['TRIAL', 'BASIC', 'STANDARD', 'PREMIUM'] },
      { name: 'status', label: '상태', type: 'select', options: ['TRIAL', 'ACTIVE', 'PAST_DUE', 'SUSPENDED', 'GRACE', 'TERMINATED', 'REACTIVATED'] },
      { name: 'startDate', label: '시작일', placeholder: '2026-01-01' },
      { name: 'renewal', label: '갱신일', placeholder: '2027-01-01' },
      { name: 'usage', label: '사용량', placeholder: 'API 00% · 저장소 00GB' },
    ],
    fallback: [
      { tenant: 'T-10035 금명전자', plan: 'STANDARD', status: 'ACTIVE', startDate: '2026-01-01', renewal: '2027-01-01', usage: 'API 38%' },
    ],
    labelOf: (d) => String(d.tenant),
  });

  const invCrud = useResourceCrud({
    type: 'invoice',
    title: '청구서',
    fields: [
      { name: 'invoiceNo', label: '청구서 번호', required: true, readOnlyOnEdit: true, placeholder: 'INV-YYYYMM-0000' },
      { name: 'tenant', label: '이용회사', required: true },
      { name: 'amount', label: '금액(원)', placeholder: '450,000' },
      { name: 'issueDate', label: '발행일', placeholder: '2026-07-01' },
      { name: 'dueDate', label: '납부기한', placeholder: '2026-07-15' },
      { name: 'status', label: '상태', type: 'select', options: ['발행', '납부완료', '연체', '부분납부', '취소'] },
      { name: 'dunning', label: '미납독촉(Dunning)', placeholder: '- / 1차 독촉 (D+10)' },
    ],
    fallback: [
      { invoiceNo: 'INV-202607-0035', tenant: 'T-10035 금명전자', amount: '450,000', issueDate: '2026-07-01', dueDate: '2026-07-15', status: '발행', dunning: '-' },
    ],
    labelOf: (d) => String(d.invoiceNo),
  });

  const crud = tab === 0 ? subCrud : invCrud;
  const visibleSubs = subCrud.rows.filter((r) => statusFilter === '전체' || r.data.status === statusFilter);

  return (
    <ScreenShell
      title="구독·청구·결제"
      screenId="OP-04"
      breadcrumb={['운영콘솔', '구독·요금·사용량', '구독·청구·결제']}
      titleRight={<>BillingPlan · UsageMeter · Invoice · DunningCase</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>구독·사용량 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>청구·미납 <span className="tno">2</span></div>
      </div>
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void crud.save()}>저장</ABtn>
          </>
        }
      >
        <QLabel>이용회사</QLabel>
        <QValue><input placeholder="tenantId/회사명" /> <span className="lens">⌕</span></QValue>
        {tab === 0 && (
          <>
            <QLabel>상태</QLabel>
            <Seg options={['전체', 'ACTIVE', 'TRIAL', 'PAST_DUE', 'SUSPENDED']} value={statusFilter} onChange={setStatusFilter} />
          </>
        )}
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            {tab === 0 ? (
              <table className="grid">
                <thead><tr><th>이용회사</th><th className="c">요금제</th><th className="c">상태</th><th>시작일</th><th>갱신일</th><th>사용량</th></tr></thead>
                <tbody>
                  {visibleSubs.map((row) => {
                    const d = row.data as Record<string, string>;
                    const idx = subCrud.rows.indexOf(row);
                    return (
                      <tr key={row.id} className={`clickable${subCrud.selected === idx ? ' sel' : ''}`} onClick={() => subCrud.setSelected(idx)}>
                        <td>{d.tenant}</td>
                        <td className="c">{d.plan}</td>
                        <td className="c"><span className={`badge ${subTone(d.status)}`}>{d.status}</span></td>
                        <td>{d.startDate}</td>
                        <td>{d.renewal}</td>
                        <td>{d.usage}</td>
                      </tr>
                    );
                  })}
                  {visibleSubs.length === 0 && <tr><td colSpan={6} className="dim">구독이 없습니다</td></tr>}
                </tbody>
              </table>
            ) : (
              <table className="grid">
                <thead><tr><th>청구서</th><th>이용회사</th><th className="num">금액</th><th>발행일</th><th>납부기한</th><th className="c">상태</th><th>Dunning</th></tr></thead>
                <tbody>
                  {invCrud.rows.map((row, idx) => {
                    const d = row.data as Record<string, string>;
                    return (
                      <tr key={row.id} className={`clickable${invCrud.selected === idx ? ' sel' : ''}`} onClick={() => invCrud.setSelected(idx)}>
                        <td className="mono">{d.invoiceNo}</td>
                        <td>{d.tenant}</td>
                        <td className="num">{d.amount}</td>
                        <td>{d.issueDate}</td>
                        <td>{d.dueDate}</td>
                        <td className="c"><span className={`badge ${d.status === '납부완료' ? 'b-ok' : d.status === '연체' ? 'b-block' : 'b-warn'}`}>{d.status}</span></td>
                        <td>{d.dunning}</td>
                      </tr>
                    );
                  })}
                  {invCrud.rows.length === 0 && <tr><td colSpan={7} className="dim">청구서가 없습니다</td></tr>}
                </tbody>
              </table>
            )}
          </div>
          {crud.form}
          <StatusBar
            tone="warn"
            message={tab === 0 ? 'PAST_DUE → GRACE → SUSPENDED 전환 시 업무 기능 단계적 제한 (신고·마감은 유예)' : '연체 청구서는 Dunning 단계(1차/2차/정지예고)에 따라 자동 통지'}
            count={tab === 0 ? `구독 ${visibleSubs.length}건` : `청구서 ${invCrud.rows.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="구독 상태머신 (설계 §12.2)">TRIAL → ACTIVE → PAST_DUE → GRACE → SUSPENDED → TERMINATED<br />(REACTIVATED 로 복귀 가능)</InfoBox>
          <InfoBox title="정지·해지 원칙">정지 중에도 법정 신고·데이터 반출은 허용<br />해지 시 보존기간 경과 후 crypto-shredding</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '이용회사별 구독·요금제·사용량과 청구·수납·미납 독촉을 운영한다.' },
          { label: '입력 필드', body: '구독: 이용회사, 요금제, 상태, 시작/갱신일, 사용량. 청구: 청구서번호, 금액, 발행/기한, 상태, Dunning.' },
          { label: '기능', body: '구독 CRUD, 상태 전환, 사용량 모니터링, 청구서 발행·수납 처리, 미납 독촉 관리.' },
          { label: '검증', body: '상태머신 전이 규칙, 정지 중 법정 기능 유지, 해지 시 데이터 보존·파기 정책.' },
          { label: '산출물', body: 'BillingPlan, Subscription, UsageMeter, Invoice, Payment, DunningCase.' },
          { label: '연계', body: 'OP-03 테넌트, 알림 엔진(D-N 기한), OP-10 감사로그.' },
        ]}
      />
    </ScreenShell>
  );
}
