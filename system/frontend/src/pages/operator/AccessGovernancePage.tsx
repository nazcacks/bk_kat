import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { accessSessionRows } from '../../api/mock/operator';

/** OP-07 Break-glass·접근 거버넌스 — 긴급 접근, 녹화, 사후검토 (CRUD) */
export default function AccessGovernancePage() {
  const [mode, setMode] = useState('전체');

  const crud = useResourceCrud({
    type: 'access-session',
    title: '접근 세션',
    fields: [
      { name: 'session', label: '세션 ID', required: true, readOnlyOnEdit: true, placeholder: 'BG-YYYYMMDD-000' },
      { name: 'tenant', label: '테넌트', required: true, placeholder: 'T-10000' },
      { name: 'mode', label: '접근모드', type: 'select', options: ['SUPPORT_SESSION', 'BREAK_GLASS', 'VIEW'] },
      { name: 'reason', label: '사유', type: 'textarea', required: true },
      { name: 'recording', label: '녹화', type: 'select', options: ['OFF', 'ON · 마스킹'] },
      { name: 'approval', label: '승인', placeholder: '1/1' },
      { name: 'status', label: '상태', type: 'select', options: ['REQUESTED', 'APPROVED', 'ACTIVE', 'EXPIRED', 'REVIEWED'] },
    ],
    fallback: accessSessionRows.map((r) => ({ session: r.session, tenant: r.tenant, mode: r.mode, reason: r.reason, recording: r.recording, approval: r.approval, status: 'ACTIVE' })),
    labelOf: (d) => String(d.session),
  });

  const visible = crud.rows.filter(
    (r) => mode === '전체' || (mode === 'BREAK' ? r.data.mode === 'BREAK_GLASS' : r.data.mode === 'SUPPORT_SESSION'),
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
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void crud.save()}>저장</ABtn>
          </>
        }
      >
        <QLabel>기간</QLabel>
        <QValue>최근 30일 <span className="lens">📅</span></QValue>
        <QLabel>접근모드</QLabel>
        <Seg options={['전체', 'SUPPORT', 'BREAK']} value={mode} onChange={setMode} />
        <QLabel>상태</QLabel>
        <QValue>REQUESTED/ACTIVE/REVIEWED <span className="lens">▾</span></QValue>
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
              <thead><tr><th>세션</th><th>테넌트</th><th>모드</th><th>사유</th><th>녹화</th><th className="c">승인</th><th className="c">상태</th></tr></thead>
              <tbody>
                {visible.map((row) => {
                  const d = row.data as Record<string, string>;
                  const idx = crud.rows.indexOf(row);
                  return (
                    <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                      <td className="mono">{d.session}</td>
                      <td>{d.tenant}</td>
                      <td>{d.mode === 'BREAK_GLASS' ? <span className="badge b-block">{d.mode}</span> : d.mode}</td>
                      <td>{d.reason}</td>
                      <td>{d.recording?.startsWith('ON') ? <span className="badge b-ok">{d.recording}</span> : d.recording}</td>
                      <td className="c">{d.approval}</td>
                      <td className="c"><span className={`badge ${d.status === 'ACTIVE' ? 'b-warn' : d.status === 'REVIEWED' ? 'b-ok' : 'b-gray'}`}>{d.status}</span></td>
                    </tr>
                  );
                })}
                {visible.length === 0 && <tr><td colSpan={7} className="dim">접근 세션이 없습니다</td></tr>}
              </tbody>
            </table>
          </div>
          {crud.form}
          <StatusBar tone="warn" message="녹화 재생은 별도 승인 후 가능 · 세션 변경은 감사로그 기록" count={`세션 ${visible.length}건`} />
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
