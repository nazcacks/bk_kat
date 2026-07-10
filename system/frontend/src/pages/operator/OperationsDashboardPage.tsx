import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { opsDashboardRows } from '../../api/mock/operator';

/** OP-01 운영 현황 대시보드 — SLO, 배치, 보안 이벤트, 테넌트 상태 관측 */
export default function OperationsDashboardPage() {
  const [scope, setScope] = useState('전체');
  const [selected, setSelected] = useState(0);

  return (
    <ScreenShell
      title="운영 현황"
      screenId="OP-01"
      breadcrumb={['운영콘솔', '운영 현황', '운영 현황 대시보드']}
      titleRight={<>Asia/Seoul · 👤 SEC_ADMIN</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>알림설정</ABtn>
          </>
        }
      >
        <QLabel>범위</QLabel>
        <Seg options={['전체', '보안', '배치']} value={scope} onChange={setScope} />
        <QLabel>기간</QLabel>
        <QValue>오늘 00:00 ~ 현재 <span className="lens">📅</span></QValue>
        <QLabel>심각도</QLabel>
        <QValue>SEV1~3 <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="fnbar">
        <span className="chip on">SLO 99.94%</span>
        <span className="chip">배치 지연 3</span>
        <span className="chip">DLQ 12</span>
        <span className="chip">보안 이벤트 5</span>
        <span className="chip">승인대기 7</span>
        <div className="sumbox"><span className="ok">핵심 API 정상</span><span>에러버짓 68%</span></div>
      </div>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead>
                <tr><th>영역</th><th>상태</th><th className="c">건수</th><th>대표 이벤트</th><th>조치</th></tr>
              </thead>
              <tbody>
                {opsDashboardRows.map((row, i) => (
                  <tr key={row.area} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                    <td>{row.area}</td>
                    <td><span className={`badge ${row.tone}`}>{row.status}</span></td>
                    <td className="c">{row.count}</td>
                    <td>{row.event}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
                <tr className="tot">
                  <td colSpan={2}>요약</td>
                  <td className="c">24</td>
                  <td colSpan={2} className="blue">SEV1 없음 · 재처리 가능 DLQ 9건 · 승인 대기 7건</td>
                </tr>
              </tbody>
            </table>
          </div>
          <StatusBar tone="warn" message="배치 지연 3건 — SLA 30분 초과 전 조치 필요" count="OperatorActivityLog 기록 대상" />
        </div>
        <RightPanel>
          <InfoBox title="오늘의 우선순위">1. DLQ 재처리 승인<br />2. MFA 미등록자 통지<br />3. 보안 이벤트 Step-up 확인</InfoBox>
          <InfoBox title="접근 경계"><span className="badge b-block">BOOKKEEPING 차단</span><br />기장 Role 없는 시스템관리자는 OP-08 업무 메뉴 미노출</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '운영 콘솔 진입 후 시스템 상태와 조치 우선순위를 즉시 파악한다.' },
          { label: '조회 조건', body: '기간, 심각도, 배치/보안/인증/권한 영역, 테넌트 영향 범위.' },
          { label: '기능', body: 'SLO, 지연 배치, DLQ, 보안 이벤트, 승인대기, MFA 미등록자를 요약한다.' },
          { label: '검증', body: '권한 없는 영역은 카드 자체를 숨기고, 민감 로그는 Step-up 후 상세 진입한다.' },
          { label: '산출물', body: '운영자 활동 로그, 알림, 인시던트, 배치 재처리 요청으로 연결된다.' },
          { label: '연계', body: 'OP-06, OP-09, OP-10, OP-07 상세 화면과 SecurityEvent, OperatorActivityLog.' },
        ]}
      />
    </ScreenShell>
  );
}
