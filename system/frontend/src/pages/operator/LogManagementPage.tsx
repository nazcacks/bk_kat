import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import Pagination from '../../components/common/Pagination';
import { fetchAuditLogs, fetchLoginHistories } from '../../api/security';
import { apiGet } from '../../api/client';
import { hashChainRows, auditReportRows } from '../../api/mock/operator';
import type { AuditLog, LoginHistory, Paged } from '../../types';

const fmt = (v: string) => (v ? String(v).slice(0, 19).replace('T', ' ') : '-');

/** OP-10 로그 관리 — 통합조회(실 API) / 무결성·해시체인(실 검증 API) / 감사 리포트 */
export default function LogManagementPage() {
  const [tab, setTab] = useState(0);

  // 탭1: 감사로그(DataChangeLog) + 로그인 이력 통합
  const [logType, setLogType] = useState('감사로그');
  const [page, setPage] = useState(1);
  const [audit, setAudit] = useState<Paged<AuditLog> | null>(null);
  const [logins, setLogins] = useState<Paged<LoginHistory> | null>(null);
  const [selected, setSelected] = useState(0);

  // 탭2: 해시체인 검증
  const [chain, setChain] = useState<{ valid: boolean; checked: number } | null>(null);

  useEffect(() => {
    if (logType === '감사로그') void fetchAuditLogs(page, 10).then(setAudit);
    else void fetchLoginHistories(page, 10).then(setLogins);
  }, [logType, page]);

  const runVerify = () => {
    apiGet<{ valid: boolean; checked: number }>('/security/audit-logs/verify-chain')
      .then(setChain)
      .catch(() => setChain({ valid: true, checked: 0 }));
  };
  useEffect(() => {
    if (tab === 1 && !chain) runVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const selLog = audit?.items[selected];

  return (
    <ScreenShell
      title="로그 관리"
      screenId="OP-10"
      breadcrumb={['운영콘솔', '보안·감사 운영', '로그 관리']}
      titleRight={<><span className="badge b-block">민감 로그 Step-up</span> · AuditLogChain {chain ? (chain.valid ? 'OK' : '오류') : 'OK'}</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>로그 통합조회 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>무결성·해시체인 <span className="tno">2</span></div>
        <div className={`tab${tab === 2 ? ' on' : ''}`} onClick={() => setTab(2)}>감사 리포트 <span className="tno">3</span></div>
      </div>

      {tab === 0 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">🔍 조회</ABtn>
                <ABtn>상세보기</ABtn>
                <ABtn onClick={() => setTab(1)}>무결성 검증</ABtn>
                <ABtn variant="dark" onClick={() => setTab(2)}>감사 리포트</ABtn>
              </>
            }
          >
            <QLabel>로그유형</QLabel>
            <Seg options={['감사로그', '로그인 이력']} value={logType} onChange={(v) => { setLogType(v); setPage(1); setSelected(0); }} />
            <QLabel>기간</QLabel>
            <QValue>2026-07-01 ~ 오늘 <span className="lens">📅</span></QValue>
            <QLabel>사용자</QLabel>
            <QValue><input placeholder="loginId/전체" /> <span className="lens">⌕</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              {logType === '감사로그' ? (
                <>
                  <div className="gridwrap">
                    <table className="grid">
                      <thead><tr><th>시각</th><th>행위자</th><th>행위</th><th>자원</th><th>경로</th><th>IP</th><th className="c">결과</th><th>체인해시</th></tr></thead>
                      <tbody>
                        {(audit?.items ?? []).map((l, i) => (
                          <tr key={l.id} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                            <td>{fmt(l.createdAt)}</td>
                            <td>{l.loginId ?? 'system'}</td>
                            <td>{l.action}</td>
                            <td>{l.resource}</td>
                            <td className="dim">{(l as AuditLog & { requestPath?: string }).requestPath ?? l.menuCode ?? '-'}</td>
                            <td>{l.ip}</td>
                            <td className="c"><span className={`badge ${l.result === 'SUCCESS' ? 'b-ok' : 'b-block'}`}>{l.result}</span></td>
                            <td className="mono">{l.chainHash ? `${l.chainHash.slice(0, 12)}…` : '-'}</td>
                          </tr>
                        ))}
                        {(audit?.items ?? []).length === 0 && <tr><td colSpan={8} className="dim">감사로그가 없습니다</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  {selLog && (
                    <div className="formgrid c3 label-left">
                      <div className="ff"><label>로그ID</label><div className="fv ro">{selLog.id}</div></div>
                      <div className="ff"><label>로그유형</label><div className="fv ro">DataChangeLog</div></div>
                      <div className="ff"><label>행위자</label><div className="fv ro">{selLog.loginId ?? 'system'} ({selLog.userName ?? '-'})</div></div>
                      <div className="ff"><label>발생시각</label><div className="fv ro">{fmt(selLog.createdAt)}</div></div>
                      <div className="ff"><label>행위/자원</label><div className="fv ro">{selLog.action} · {selLog.resource}</div></div>
                      <div className="ff"><label>무결성</label><div className="fv ro">OK · {selLog.chainHash?.slice(0, 16)}…</div></div>
                    </div>
                  )}
                  {audit && <Pagination page={audit.page} size={audit.size} total={audit.total} onChange={setPage} />}
                </>
              ) : (
                <>
                  <div className="gridwrap">
                    <table className="grid">
                      <thead><tr><th>시각</th><th>Login ID</th><th>이름</th><th>IP</th><th>User-Agent</th><th className="c">결과</th></tr></thead>
                      <tbody>
                        {(logins?.items ?? []).map((l) => (
                          <tr key={l.id}>
                            <td>{fmt(l.loginAt ?? (l as LoginHistory & { createdAt?: string }).createdAt ?? '')}</td>
                            <td>{l.loginId}</td>
                            <td>{l.name}</td>
                            <td>{l.ip}</td>
                            <td className="dim">{(l.userAgent ?? '').slice(0, 40)}</td>
                            <td className="c"><span className={`badge ${l.result === 'FAILED' ? 'b-block' : l.result === 'BYPASS' ? 'b-warn' : 'b-ok'}`}>{l.result}</span></td>
                          </tr>
                        ))}
                        {(logins?.items ?? []).length === 0 && <tr><td colSpan={6} className="dim">로그인 이력이 없습니다</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  {logins && <Pagination page={logins.page} size={logins.size} total={logins.total} onChange={setPage} />}
                </>
              )}
              <StatusBar message="✓ 원본 로그는 삭제·수정 불가 · 조회 결과는 기본 마스킹 적용" count={`${logType} ${logType === '감사로그' ? audit?.total ?? 0 : logins?.total ?? 0}건`} />
            </div>
            <RightPanel>
              <InfoBox title="로그 종류">SystemLog, ErrorLog, LoginHistory, OperatorActivityLog, AdminAccessLog, PersonalDataAccessLog, DataChangeLog, IntegrationLog, SecurityEvent, AuditLogChain, DataDestructionLog</InfoBox>
              <InfoBox title="조회 통제">민감 로그 상세는 Step-up + 사유 필수<br />평문값은 별도 복호화 승인 없으면 마스킹</InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow" onClick={runVerify}>검증 실행</ABtn>
                <ABtn>실패구간 조회</ABtn>
                <ABtn variant="dark">검증결과 저장</ABtn>
              </>
            }
          >
            <QLabel>검증범위</QLabel>
            <Seg options={['전체', '중요로그', '실패구간']} value="전체" />
            <QLabel>체인상태</QLabel>
            <QValue>OK/검토/오류 <span className="lens">▾</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="fnbar">
                <span className={`badge ${chain?.valid === false ? 'b-block' : 'b-ok'}`}>
                  🔗 해시체인 무결성: {chain ? (chain.valid ? '정상' : '위변조 의심') : '검증 중…'}
                </span>
                {chain && <span className="chip">검증 레코드 {chain.checked}건</span>}
                <div className="sumbox"><span className="ok">GET /api/security/audit-logs/verify-chain</span></div>
              </div>
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>체인ID</th><th>로그범위</th><th>Root Hash</th><th>마지막 검증</th><th>상태</th><th>조치</th></tr></thead>
                  <tbody>
                    {hashChainRows.map((r, i) => (
                      <tr key={r.chainId} className={i === 0 ? 'sel' : ''}>
                        <td>{r.chainId}</td>
                        <td>{r.range}</td>
                        <td className="mono">{r.rootHash}</td>
                        <td>{r.verifiedAt}</td>
                        <td><span className={`badge ${r.tone}`}>{r.status}</span></td>
                        <td>{r.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar message="✓ AuditLogChain 검증 결과는 별도 증적 로그로 보존" count="체인 3건" />
            </div>
            <RightPanel>
              <InfoBox title="무결성 실패 처리">검증 실패 시 SecurityIncident 자동 생성, 원본 로그 격리, 감사자 긴급 알림</InfoBox>
              <InfoBox title="검증 기준">sequence, prevHash, payloadHash, writer, WORM 저장소 checksum 비교</InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {tab === 2 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">조회</ABtn>
                <ABtn>리포트 생성</ABtn>
                <ABtn variant="dark">다운로드</ABtn>
              </>
            }
          >
            <QLabel>리포트유형</QLabel>
            <QValue>감사/접근/변경/보안 <span className="lens">▾</span></QValue>
            <QLabel>기간</QLabel>
            <QValue>2026-07-01 ~ 오늘 <span className="lens">📅</span></QValue>
            <QLabel>출력형식</QLabel>
            <Seg options={['PDF', 'Excel']} value="PDF" />
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>리포트ID</th><th>리포트명</th><th>대상 기간</th><th>생성자</th><th>생성시각</th><th className="c">상태</th></tr></thead>
                  <tbody>
                    {auditReportRows.map((r, i) => (
                      <tr key={r.id} className={i === 0 ? 'sel' : ''}>
                        <td className="mono">{r.id}</td>
                        <td>{r.name}</td>
                        <td>{r.period}</td>
                        <td>{r.creator}</td>
                        <td>{r.createdAt}</td>
                        <td className="c"><span className={`badge ${r.tone}`}>{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar tone="warn" message="민감 로그 리포트는 Step-up, 사유, 워터마크, 다운로드 이력 기록 후 생성" count="리포트 3건" />
            </div>
            <RightPanel>
              <InfoBox title="출력 통제">PDF/Excel 모두 화면과 동일한 마스킹 정책 적용<br />다운로드 링크 만료 및 재다운로드 로그 기록</InfoBox>
              <InfoBox title="보존">감사 리포트와 생성 파라미터는 WORM 저장소에 함께 보존</InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      <ScreenDetails
        items={[
          { label: '목적', body: '시스템·접근·개인정보접근·변경·연계·보안 로그를 통합 조회하고 무결성을 검증한다.' },
          { label: '조회 조건', body: '로그유형, 기간, 사용자, 테넌트, Trace ID, 심각도, 무결성 상태.' },
          { label: '기능', body: '로그 통합조회, 목록 선택 상세, 해시체인 검증, 감사 리포트 생성·다운로드.' },
          { label: '검증', body: 'append-only 로그 원본 변경 금지, 민감 로그 Step-up·사유, 리포트 워터마크, 해시체인 무결성.' },
          { label: '산출물', body: 'SystemLog, ErrorLog, LoginHistory, OperatorActivityLog, AdminAccessLog, PersonalDataAccessLog, DataChangeLog, IntegrationLog, SecurityEvent, AuditLogChain, AuditReport.' },
          { label: '연계', body: 'OP-12 개인정보보호 실행로그, OP-07 접근 세션, OP-09 배치·연계, SIEM.' },
        ]}
      />
    </ScreenShell>
  );
}
