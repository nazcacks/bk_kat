import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';

const ruleTone = (s: string) => (s === 'ACTIVE' ? 'b-ok' : s === 'SHADOW' ? 'b-warn' : 'b-gray');
const modelTone = (s: string) =>
  s === 'ACTIVE' ? 'b-ok' : s === 'SHADOW' || s === 'STAGED' || s === 'TRAINING' ? 'b-warn' : 'b-gray';

/** OP-11 AI·규칙 운영 — 이상탐지 규칙·모델 버전·챗봇 가드레일 (설계 §11.7, §17) */
export default function AiRuleOpsPage() {
  const [tab, setTab] = useState(0);

  const ruleCrud = useResourceCrud({
    type: 'anomaly-rule',
    title: '이상탐지 규칙',
    fields: [
      { name: 'ruleCode', label: '규칙 코드', required: true, readOnlyOnEdit: true, placeholder: 'ANM-000' },
      { name: 'name', label: '규칙명', required: true },
      { name: 'target', label: '대상', type: 'select', options: ['전표', '증빙', '로그인', '다운로드', '권한변경'] },
      { name: 'condition', label: '탐지 조건', required: true, placeholder: '휴일 AND 건수 > 50' },
      { name: 'severity', label: '심각도', type: 'select', options: ['HIGH', 'MEDIUM', 'LOW'] },
      { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'SHADOW', 'RETIRED'] },
    ],
    fallback: [
      { ruleCode: 'ANM-001', name: '휴일 대량 전표', target: '전표', condition: '휴일 AND 건수 > 50', severity: 'HIGH', status: 'ACTIVE' },
    ],
    labelOf: (d) => `${d.ruleCode} ${d.name}`,
  });

  const modelCrud = useResourceCrud({
    type: 'ai-model',
    title: 'AI 모델',
    fields: [
      { name: 'modelId', label: '모델 ID', required: true, readOnlyOnEdit: true, placeholder: 'ANOMALY-TX-2026Q3' },
      { name: 'type', label: '유형', type: 'select', options: ['이상탐지', '조회 챗봇'] },
      { name: 'version', label: '버전', placeholder: 'v1' },
      { name: 'status', label: '상태', type: 'select', options: ['TRAINING', 'STAGED', 'SHADOW', 'ACTIVE', 'RETIRED'] },
      { name: 'note', label: '비고', type: 'textarea' },
    ],
    fallback: [
      { modelId: 'ANOMALY-TX-2026Q2', type: '이상탐지', version: 'v4', status: 'ACTIVE', note: '가명화 특징량 학습' },
    ],
    labelOf: (d) => String(d.modelId),
  });

  const crud = tab === 0 ? ruleCrud : modelCrud;

  return (
    <ScreenShell
      title="AI·규칙 운영"
      screenId="OP-11"
      breadcrumb={['운영콘솔', 'AI·규칙 운영', 'AI·규칙 운영']}
      titleRight={<>외부 LLM 원시 전표 전송 금지 · 온프레미스/VPC 우선</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>이상탐지 규칙 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>모델·챗봇 운영 <span className="tno">2</span></div>
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
        <QLabel>검색</QLabel>
        <QValue><input placeholder={tab === 0 ? '규칙 코드/규칙명' : '모델 ID'} /> <span className="lens">⌕</span></QValue>
        <QLabel>운영 원칙</QLabel>
        <QValue off>{tab === 0 ? 'SHADOW 운영 후 ACTIVE 승격' : '섀도우 비교 후 무중단 승격'}</QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            {tab === 0 ? (
              <table className="grid">
                <thead><tr><th>규칙 코드</th><th>규칙명</th><th className="c">대상</th><th>탐지 조건</th><th className="c">심각도</th><th className="c">상태</th></tr></thead>
                <tbody>
                  {ruleCrud.rows.map((row, idx) => {
                    const r = row.data as Record<string, string>;
                    return (
                      <tr key={row.id} className={`clickable${ruleCrud.selected === idx ? ' sel' : ''}`} onClick={() => ruleCrud.setSelected(idx)}>
                        <td className="mono">{r.ruleCode}</td>
                        <td>{r.name}</td>
                        <td className="c">{r.target}</td>
                        <td className="mono">{r.condition}</td>
                        <td className="c"><span className={`badge ${r.severity === 'HIGH' ? 'b-block' : r.severity === 'MEDIUM' ? 'b-warn' : 'b-gray'}`}>{r.severity}</span></td>
                        <td className="c"><span className={`badge ${ruleTone(r.status)}`}>{r.status}</span></td>
                      </tr>
                    );
                  })}
                  {ruleCrud.rows.length === 0 && <tr><td colSpan={6} className="dim">규칙이 없습니다</td></tr>}
                </tbody>
              </table>
            ) : (
              <table className="grid">
                <thead><tr><th>모델 ID</th><th className="c">유형</th><th className="c">버전</th><th className="c">상태</th><th>비고</th></tr></thead>
                <tbody>
                  {modelCrud.rows.map((row, idx) => {
                    const r = row.data as Record<string, string>;
                    return (
                      <tr key={row.id} className={`clickable${modelCrud.selected === idx ? ' sel' : ''}`} onClick={() => modelCrud.setSelected(idx)}>
                        <td className="mono">{r.modelId}</td>
                        <td className="c">{r.type}</td>
                        <td className="c">{r.version}</td>
                        <td className="c"><span className={`badge ${modelTone(r.status)}`}>{r.status}</span></td>
                        <td>{r.note}</td>
                      </tr>
                    );
                  })}
                  {modelCrud.rows.length === 0 && <tr><td colSpan={5} className="dim">모델이 없습니다</td></tr>}
                </tbody>
              </table>
            )}
          </div>
          {crud.form}
          <StatusBar
            tone="warn"
            message={tab === 0 ? '탐지 알림은 NEW → IN_REVIEW → 정상확인/조치완료 로 처리 (ANOMALY_ALERT_STATUS)' : '모델 수명주기: TRAINING → STAGED → SHADOW → ACTIVE → RETIRED'}
            count={tab === 0 ? `규칙 ${ruleCrud.rows.length}건` : `모델 ${modelCrud.rows.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="AI 데이터 보호 (설계 §17)">학습/추론 입력 PII 가명화·특징량화<br />외부 LLM 에 원시 전표 전송 금지<br />온프레미스/VPC 추론 우선</InfoBox>
          <InfoBox title="챗봇 가드레일">
            <KV k="권한" v="읽기 전용 강제" />
            <KV k="tenantId" v="서버 강제 주입" />
            <KV k="PII" v="마스킹 반환" />
            <KV k="주입 공격" v="프롬프트 방어" />
          </InfoBox>
          <InfoBox title="감사">질의는 ChatQueryLog, 탐지는 SecurityEvent 로 전건 기록</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '이상거래 탐지 규칙과 AI 모델(이상탐지·조회 챗봇)의 버전·가드레일을 운영한다.' },
          { label: '입력 필드', body: '규칙: 코드, 규칙명, 대상, 탐지 조건, 심각도, 상태. 모델: ID, 유형, 버전, 상태.' },
          { label: '기능', body: '규칙 CRUD, SHADOW→ACTIVE 승격, 모델 버전 관리, 챗봇 가드레일·QueryTool 허용목록.' },
          { label: '검증', body: 'SHADOW 운영 비교 후 승격, PII 가명화, 외부 LLM 전송 차단, 읽기전용 강제.' },
          { label: '산출물', body: 'STD_ANOMALY_RULE, AnomalyModel, AnomalyAlert, ChatQueryLog.' },
          { label: '연계', body: 'TN-14 협업·AI(테넌트 알림), OP-10 SecurityEvent, 표준 카탈로그(규칙 배포).' },
        ]}
      />
    </ScreenShell>
  );
}
