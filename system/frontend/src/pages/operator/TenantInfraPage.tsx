import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { tenantInfraRows } from '../../api/mock/operator';

const statusTone = (s: string) => (s === 'ACTIVE' ? 'b-ok' : s === 'SUSPENDED' ? 'b-block' : 'b-warn');

/** OP-03 테넌트 인프라·격리 티어 — 쿼터, 스냅샷, PITR 복구 지원 (CRUD) */
export default function TenantInfraPage() {
  const [tier, setTier] = useState('전체');

  const crud = useResourceCrud({
    type: 'tenant',
    title: '테넌트',
    fields: [
      { name: 'tenant', label: '테넌트ID', required: true, readOnlyOnEdit: true, placeholder: 'T-10000' },
      { name: 'name', label: '회사명', required: true },
      { name: 'tier', label: '격리 티어', type: 'select', options: ['SHARED', 'SCHEMA', 'DEDICATED'] },
      { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'MIGRATING', 'SUSPENDED'] },
      { name: 'quota', label: '쿼터', placeholder: 'DB 00% · Jobs 0/10' },
      { name: 'snapshot', label: '최근 스냅샷', placeholder: 'YYYY-MM-DD HH:mm' },
      { name: 'verify', label: '복구 검증', placeholder: 'checksum OK' },
    ],
    fallback: tenantInfraRows.map((r) => ({ ...r })),
    labelOf: (d) => `${d.tenant} ${d.name}`,
  });

  const visible = crud.rows.filter((r) => tier === '전체' || r.data.tier === tier);

  return (
    <ScreenShell
      title="테넌트 인프라"
      screenId="OP-03"
      breadcrumb={['운영콘솔', '이용회사/테넌트', '테넌트 인프라']}
      titleRight={<>VIEW 세션 · 평문 데이터 접근 없음</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void crud.save()}>저장</ABtn>
            <ABtn>스냅샷 생성</ABtn>
          </>
        }
      >
        <QLabel>테넌트</QLabel>
        <QValue><input placeholder="회사명/tenantId" /> <span className="lens">⌕</span></QValue>
        <QLabel>티어</QLabel>
        <Seg options={['전체', 'SHARED', 'SCHEMA', 'DEDICATED']} value={tier} onChange={setTier} />
        <QLabel>상태</QLabel>
        <QValue>ACTIVE/SUSPENDED/MIGRATING <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead>
                <tr><th>Tenant</th><th>회사명</th><th>티어</th><th className="c">상태</th><th>쿼터</th><th>최근 스냅샷</th><th>복구 검증</th></tr>
              </thead>
              <tbody>
                {visible.map((row) => {
                  const d = row.data as Record<string, string>;
                  const idx = crud.rows.indexOf(row);
                  return (
                    <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                      <td>{d.tenant}</td>
                      <td>{d.name}</td>
                      <td>{d.tier}</td>
                      <td className="c"><span className={`badge ${statusTone(d.status)}`}>{d.status}</span></td>
                      <td>{d.quota}</td>
                      <td>{d.snapshot}</td>
                      <td>{d.verify}</td>
                    </tr>
                  );
                })}
                {visible.length === 0 && <tr><td colSpan={7} className="dim">테넌트가 없습니다 — [추가] 로 등록하세요</td></tr>}
              </tbody>
            </table>
          </div>
          {crud.form}
          <StatusBar message="✓ 평문 데이터 접근 없이 인프라 메타만 조회 · 변경은 감사로그 기록" count={`테넌트 ${visible.length}건`} />
        </div>
        <RightPanel>
          <InfoBox title="전환 게이트">레코드 count · 금액 합계 · checksum · 해시체인 · 라우팅 검증</InfoBox>
          <InfoBox title="차단 조건"><span className="badge b-block">마감/신고 성수기</span><br />스냅샷 없음 · 롤백계획 없음 · checksum 불일치</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '테넌트 격리 티어, 쿼터, 스냅샷, 복구 상태를 기술 관점에서 운영한다.' },
          { label: '조회 조건', body: '테넌트, 티어, 상태, 쿼터 초과, 스냅샷 생성일, 전환 작업 상태.' },
          { label: '기능', body: '티어 전환 예약, 스냅샷 생성, PITR 복구 요청, 쿼터 조정, 검증 결과 확인.' },
          { label: '검증', body: 'count, 금액합계, checksum, 해시체인, 라우팅이 불일치하면 전환 차단.' },
          { label: '산출물', body: 'TenantSnapshot, TierMigrationJob, TierMigrationValidation, 롤백 로그.' },
          { label: '연계', body: 'OP-09 배치 큐, OP-10 감사로그, §2 멀티테넌시·백업 정책.' },
        ]}
      />
    </ScreenShell>
  );
}
