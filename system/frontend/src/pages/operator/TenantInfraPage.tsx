import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { tenantInfraRows } from '../../api/mock/operator';

/** OP-03 테넌트 인프라·격리 티어 — 쿼터, 스냅샷, PITR 복구 지원 */
export default function TenantInfraPage() {
  const [tier, setTier] = useState('전체');
  const [selected, setSelected] = useState(0);

  const rows = tenantInfraRows.filter((r) => tier === '전체' || r.tier === tier);

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
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>추가</ABtn>
            <ABtn>수정</ABtn>
            <ABtn variant="red">삭제</ABtn>
            <ABtn variant="dark">저장</ABtn>
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
        <QLabel>스냅샷일</QLabel>
        <QValue>최근 7일 <span className="lens">📅</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead>
                <tr><th>Tenant</th><th>회사명</th><th>티어</th><th className="c">상태</th><th>쿼터</th><th>최근 스냅샷</th><th>복구 검증</th></tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.tenant} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                    <td>{row.tenant}</td>
                    <td>{row.name}</td>
                    <td>{row.tier}</td>
                    <td className="c"><span className={`badge ${row.tone}`}>{row.status}</span></td>
                    <td>{row.quota}</td>
                    <td>{row.snapshot}</td>
                    <td>{row.verifyTone ? <span className={`badge ${row.verifyTone}`}>{row.verify}</span> : row.verify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatusBar message="✓ 평문 데이터 접근 없이 인프라 메타만 조회" count="TierMigrationJob 1건 진행 중" />
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
