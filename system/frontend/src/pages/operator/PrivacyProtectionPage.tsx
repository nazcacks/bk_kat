import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import Pagination from '../../components/common/Pagination';
import { fetchMaskingPolicies, fetchPrivacyAccessLogs } from '../../api/security';
import { privacyPolicyRows, privacyChannelRows } from '../../api/mock/operator';
import type { MaskingPolicy, Paged, PrivacyAccessLog } from '../../types';

const fmt = (v: string) => (v ? String(v).slice(0, 19).replace('T', ' ') : '-');

/** OP-12 개인정보보호 — 정책설정(실제 마스킹정책 API) + 실행 로그(실제 접근로그 API) */
export default function PrivacyProtectionPage() {
  const [tab, setTab] = useState(0);
  const [kind, setKind] = useState('전체');

  // 탭1: 정책 (실제 마스킹 정책 + 설계 mock 정책)
  const [maskingPolicies, setMaskingPolicies] = useState<MaskingPolicy[]>([]);
  // 탭2: 실행 로그 (실제 개인정보 접근로그)
  const [page, setPage] = useState(1);
  const [execLogs, setExecLogs] = useState<Paged<PrivacyAccessLog> | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    void fetchMaskingPolicies().then(setMaskingPolicies);
  }, []);
  useEffect(() => {
    if (tab === 1) void fetchPrivacyAccessLogs(page, 10).then(setExecLogs);
  }, [tab, page]);

  const policyRows = privacyPolicyRows.filter((r) => kind === '전체' || r.kind === kind);
  const selLog = execLogs?.items[selected];

  return (
    <ScreenShell
      title="정책설정·실행로그"
      screenId="OP-12"
      breadcrumb={['운영콘솔', '개인정보보호', '정책설정·실행로그']}
      titleRight={<><span className="badge b-block">평문 접근 승인 필요</span> · 정책 적용률 100%</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>정책설정 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>실행 로그 <span className="tno">2</span></div>
      </div>

      {tab === 0 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">조회</ABtn>
                <ABtn>정책 추가</ABtn>
                <ABtn>수정</ABtn>
                <ABtn variant="red">삭제</ABtn>
                <ABtn variant="dark">저장</ABtn>
                <ABtn>영향 분석</ABtn>
              </>
            }
          >
            <QLabel>정책구분</QLabel>
            <Seg options={['전체', '카탈로그', '마스킹', '보존·파기', 'DLP']} value={kind} onChange={setKind} />
            <QLabel>상태</QLabel>
            <QValue>ACTIVE/DRAFT/RETIRED <span className="lens">▾</span></QValue>
            <QLabel>대상</QLabel>
            <QValue><input placeholder="table.column/화면/Role" /> <span className="lens">⌕</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>정책ID</th><th>정책구분</th><th>대상</th><th>처리목적</th><th>보호조치</th><th>승인</th><th className="c">상태</th></tr></thead>
                  <tbody>
                    {policyRows.map((r, i) => (
                      <tr key={r.id} className={i === 0 ? 'sel' : ''}>
                        <td className="mono">{r.id}</td>
                        <td>{r.kind}</td>
                        <td>{r.target}</td>
                        <td>{r.purpose}</td>
                        <td>{r.protection}</td>
                        <td>{r.approval}</td>
                        <td className="c"><span className={`badge ${r.tone}`}>{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="qbar">
                <span className="qlabel">시스템 마스킹 정책 (실데이터)</span>
                <span className="qv">masking_policy 테이블 · GET /api/security/masking-policies</span>
              </div>
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>분류</th><th>대상 필드</th><th>마스킹 규칙</th><th>설명</th><th className="c">활성</th></tr></thead>
                  <tbody>
                    {maskingPolicies.map((p) => (
                      <tr key={p.id}>
                        <td>{p.dataType}</td>
                        <td className="mono">{p.fieldName}</td>
                        <td className="mono">{p.maskPattern}</td>
                        <td>{p.description}</td>
                        <td className="c"><span className={`badge ${p.isActive ? 'b-ok' : 'b-gray'}`}>{p.isActive ? 'Y' : 'N'}</span></td>
                      </tr>
                    ))}
                    {maskingPolicies.length === 0 && <tr><td colSpan={5} className="dim">마스킹 정책이 없습니다</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>적용 채널</th><th>화면/출력</th><th>Role</th><th>마스킹 규칙</th><th>평문 허용</th></tr></thead>
                  <tbody>
                    {privacyChannelRows.map((r, i) => (
                      <tr key={r.channel} className={i === 0 ? 'sel' : ''}>
                        <td>{r.channel}</td><td>{r.screen}</td><td>{r.role}</td><td>{r.rule}</td><td>{r.plain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar tone="warn" message="정책 저장 전 카탈로그 필수값, 영향 화면/API, 다운로드, 로그 노출 정책을 검증" count={`정책 ${policyRows.length}건 · 마스킹 ${maskingPolicies.length}건`} />
            </div>
            <RightPanel>
              <InfoBox title="필수 검증">처리목적, 법적근거, 보유기간, 암호화/마스킹, 담당자 누락 시 저장 차단</InfoBox>
              <InfoBox title="권한 통제">평문 조회는 Step-up, 사유, 승인자 분리, 제한시간, 자동 재마스킹 필수</InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">조회</ABtn>
                <ABtn>상세보기</ABtn>
                <ABtn>관련 로그</ABtn>
                <ABtn variant="dark">실행 로그 리포트</ABtn>
              </>
            }
          >
            <QLabel>로그유형</QLabel>
            <Seg options={['전체', '정책적용', '평문조회', '다운로드', '파기']} value="전체" />
            <QLabel>기간</QLabel>
            <QValue>2026-07-01 ~ 오늘 <span className="lens">📅</span></QValue>
            <QLabel>대상</QLabel>
            <QValue><input placeholder="정책ID/사용자/테넌트" /> <span className="lens">⌕</span></QValue>
          </QueryBar>
          <div className="mock-flex">
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>시각</th><th>실행로그</th><th>사용자</th><th>대상</th><th>개인정보 항목</th><th>처리목적</th><th className="c">접근유형</th></tr></thead>
                  <tbody>
                    {(execLogs?.items ?? []).map((l, i) => (
                      <tr key={l.id} className={`clickable${selected === i ? ' sel' : ''}`} onClick={() => setSelected(i)}>
                        <td>{fmt(l.createdAt)}</td>
                        <td>PersonalDataAccessLog</td>
                        <td>{l.loginId}</td>
                        <td>{l.targetType} · {l.targetName}</td>
                        <td>{(l.dataItems ?? []).map((d) => <span key={d} className="badge b-gray" style={{ marginRight: 3 }}>{d}</span>)}</td>
                        <td>{l.purpose}</td>
                        <td className="c"><span className={`badge ${l.accessType === 'VIEW_PLAIN' ? 'b-warn' : 'b-ok'}`}>{l.accessType}</span></td>
                      </tr>
                    ))}
                    {(execLogs?.items ?? []).length === 0 && <tr><td colSpan={7} className="dim">실행 로그가 없습니다 — 사용자 평문조회 시 자동 기록됩니다</td></tr>}
                  </tbody>
                </table>
              </div>
              {selLog && (
                <div className="formgrid c3 label-left">
                  <div className="ff"><label>실행로그ID</label><div className="fv ro">{selLog.id}</div></div>
                  <div className="ff"><label>실행유형</label><div className="fv ro">{selLog.accessType}</div></div>
                  <div className="ff"><label>발생시각</label><div className="fv ro">{fmt(selLog.createdAt)}</div></div>
                  <div className="ff"><label>요청자</label><div className="fv ro">{selLog.loginId} ({selLog.userName ?? '-'})</div></div>
                  <div className="ff"><label>대상</label><div className="fv ro">{selLog.targetType} · {selLog.targetName}</div></div>
                  <div className="ff"><label>항목</label><div className="fv ro">{(selLog.dataItems ?? []).join(', ')}</div></div>
                  <div className="ff full"><label>처리목적</label><div className="fv ro">{selLog.purpose ?? '-'}</div></div>
                </div>
              )}
              {execLogs && <Pagination page={execLogs.page} size={execLogs.size} total={execLogs.total} onChange={setPage} />}
              <StatusBar message="✓ 실행 로그는 OP-10 로그 관리에서도 통합 조회 가능하고, OP-12에서는 정책별 실행 이력으로 조회" count={`실행 로그 ${execLogs?.total ?? 0}건`} />
            </div>
            <RightPanel>
              <InfoBox title="조회 통제">개인정보 실행 로그 상세는 권한·Step-up·사유를 검증하고 평문값은 기본 마스킹</InfoBox>
              <InfoBox title="추적 기준">policyId, traceId, actor, target, purpose, approvalId, result를 필수 기록</InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      <ScreenDetails
        items={[
          { label: '목적', body: '개인정보 카탈로그, 마스킹, 평문 접근, 보존·파기, DLP 정책을 설정하고 실제 실행 이력을 조회한다.' },
          { label: '조회 조건', body: '정책구분, 상태, 대상 위치, 화면/출력, Role, 기간, 사용자, 테넌트, Trace ID.' },
          { label: '기능', body: '정책 조회·추가·수정·삭제·저장, 영향 분석, 평문 접근 승인, 실행 로그 조회, 실행 로그 리포트.' },
          { label: '검증', body: '카탈로그 필수값, 암호화/마스킹, 승인자 분리, 제한시간, 자동 재마스킹, 보존기간·파기 승인.' },
          { label: '산출물', body: 'PersonalDataCatalog, MaskingPolicy, PlainTextAccessRequest, RetentionPolicy, DlpRule, PersonalDataAccessLog, MaskingApplyLog, DataDestructionLog, DlpEventLog.' },
          { label: '연계', body: 'OP-10 로그 관리, OP-07 접근 세션, 화면·보고서·Excel 다운로드, SIEM, KMS.' },
        ]}
      />
    </ScreenShell>
  );
}
