import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { accessSessionRows } from '../../api/mock/operator';

/** OP-07 Break-glass·접근 거버넌스 — 긴급 접근, 녹화, 사후검토 */
export default function AccessGovernancePage() {
  const [mode, setMode] = useState('전체');
  const [selected, setSelected] = useState(0);

  const rows = accessSessionRows.filter(
    (r) => mode === '전체' || (mode === 'BREAK' ? r.mode === 'BREAK_GLASS' : r.mode === 'SUPPORT_SESSION'),
  );

  return (
    <ScreenShell
      title="Break-glass 검토"
      screenId="OP-07"
      breadcrumb={['운영콘솔', '접근 거버넌스', 'Break-glass·접근']}
      titleRight={<>요청자≠승인자≠사후검토자</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>추가</ABtn>
            <ABtn>수정</ABtn>
            <ABtn variant="red">삭제</ABtn>
            <ABtn variant="dark">저장</ABtn>
          </>
        }
      >
        <QLabel>기간</QLabel>
        <QValue>최근 30일 <span className="lens">📅</span></QValue>
        <QLabel>접근모드</QLabel>
        <Seg options={['전체', 'SUPPORT', 'BREAK']} value={mode} onChange={(v) => { setMode(v); setSelected(0); }} />
        <QLabel>상태</QLabel>
        <QValue>REQUESTED/ACTIVE/REVIEWED <span className="lens">▾</span></QValue>
        <QLabel>테넌트</QLabel>
        <QValue><input placeholder="tenantId/회사명" /> <span className="lens">⌕</span></QValue>
      </QueryBar>
      <div className="fnbar">
        <span className="chip">REQUESTED</span><span className="ar">→</span>
        <span className="chip">APPROVED</span><span className="ar">→</span>
        <span className="chip on">ACTIVE</span><span className="ar">→</span>
        <span className="chip">EXPIRED</span><span className="ar">→</span>
        <span className="chip">REVIEWED</span>
      </div>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>세션</th><th>테넌트</th><th>모드</th><th>사유</th><th>녹화</th><th className="c">승인</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.session} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                    <td>{r.session}</td>
                    <td>{r.tenant}</td>
                    <td>{r.modeTone ? <span className={`badge ${r.modeTone}`}>{r.mode}</span> : r.mode}</td>
                    <td>{r.reason}</td>
                    <td>{r.recordingTone ? <span className={`badge ${r.recordingTone}`}>{r.recording}</span> : r.recording}</td>
                    <td className="c">{r.approval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatusBar tone="warn" message="녹화 재생은 별도 승인 후 가능" count="SessionRecording 1건" />
        </div>
        <RightPanel>
          <InfoBox title="녹화 마스킹">PASSWORD · PII · FINANCIAL · PAYROLL · SECRET 필드 원문 캡처 차단</InfoBox>
          <InfoBox title="사후검토">AdminAccessLog + DataChangeLog + 녹화 타임라인 통합 리포트</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '긴급 접근과 테넌트 지원 세션을 승인·기록·검토한다.' },
          { label: '입력 필드', body: '접근모드, 테넌트, 사유, 기간, 요청자, 승인자, 녹화 재생 요청.' },
          { label: '기능', body: '세션 발급, 녹화, 마스킹, 재생 승인, 사후검토, 회사 통지.' },
          { label: '검증', body: '요청자/승인자/검토자 분리, 사전동의, 시간·범위 제한, 민감정보 마스킹.' },
          { label: '산출물', body: 'AdminAccessSession, BreakGlassRequest, SessionRecording, ReviewReport.' },
          { label: '연계', body: 'OP-10 로그 관리, OP-12 개인정보보호 실행로그, SecurityEvent, NotificationService.' },
        ]}
      />
    </ScreenShell>
  );
}
