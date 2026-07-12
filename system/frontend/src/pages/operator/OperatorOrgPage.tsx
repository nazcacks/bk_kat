import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';

/** OP-02 운영조직 도메인 (BF-01) — OperatorOrg 트리·담당 배정·콘솔 IP 허용목록 (설계 §14) */
export default function OperatorOrgPage() {
  const [tab, setTab] = useState(0);

  const orgCrud = useResourceCrud({
    type: 'operator-org',
    title: '운영 조직',
    fields: [
      { name: 'orgCode', label: '조직코드', required: true, readOnlyOnEdit: true, placeholder: 'SYS-OPS' },
      { name: 'name', label: '조직명', required: true },
      { name: 'parentOrg', label: '상위조직', placeholder: 'HQ (루트는 공백)' },
      { name: 'taxAgentNo', label: '세무대리 등록번호', placeholder: '세무대리 12345 / -' },
      { name: 'manager', label: '책임자' },
      { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'INACTIVE'] },
    ],
    fallback: [
      { orgCode: 'HQ', name: '관리회사 본부', parentOrg: null, taxAgentNo: '세무대리 12345', manager: '조강수', status: 'ACTIVE' },
      { orgCode: 'SYS-OPS', name: '시스템운영팀', parentOrg: 'HQ', taxAgentNo: '-', manager: '김시스템', status: 'ACTIVE' },
    ],
    labelOf: (d) => `${d.orgCode} ${d.name}`,
  });

  const assignCrud = useResourceCrud({
    type: 'tenant-assignment',
    title: '담당 배정',
    fields: [
      { name: 'tenant', label: '이용회사', required: true, placeholder: 'T-10035 금명전자' },
      { name: 'assignee', label: '담당자', required: true },
      { name: 'role', label: '기장 Role', type: 'select', options: ['BK_PREPARER', 'BK_REVIEWER', 'BK_MANAGER'] },
      { name: 'startDate', label: '시작일', placeholder: '2026-01-01' },
      { name: 'endDate', label: '종료일', placeholder: '9999-12-31' },
      { name: 'status', label: '상태', type: 'select', options: ['ASSIGNED', 'TRANSFER_REQUESTED', 'TRANSFERRED', 'ENDED'] },
    ],
    fallback: [
      { tenant: 'T-10035 금명전자', assignee: '김기장', role: 'BK_PREPARER', startDate: '2026-01-01', endDate: '9999-12-31', status: 'ASSIGNED' },
    ],
    labelOf: (d) => `${d.tenant} · ${d.assignee}`,
  });

  const ipCrud = useResourceCrud({
    type: 'console-ip',
    title: '콘솔 IP 허용목록',
    fields: [
      { name: 'cidr', label: 'CIDR', required: true, placeholder: '203.0.113.0/24' },
      { name: 'label', label: '설명', required: true },
      { name: 'addedBy', label: '등록자' },
      { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'DISABLED'] },
    ],
    fallback: [{ cidr: '203.0.113.0/24', label: '본사 사무실', addedBy: 'sec.admin', status: 'ACTIVE' }],
    labelOf: (d) => String(d.cidr),
  });

  const crud = tab === 0 ? orgCrud : tab === 1 ? assignCrud : ipCrud;

  const renderGrid = () => {
    if (tab === 0) {
      return (
        <table className="grid">
          <thead><tr><th>조직코드</th><th>조직명</th><th>상위조직</th><th>세무대리 등록번호</th><th>책임자</th><th className="c">상태</th></tr></thead>
          <tbody>
            {orgCrud.rows.map((row, idx) => {
              const d = row.data as Record<string, string>;
              return (
                <tr key={row.id} className={`clickable${orgCrud.selected === idx ? ' sel' : ''}`} onClick={() => orgCrud.setSelected(idx)}>
                  <td className="mono">{d.orgCode}</td>
                  <td>{d.parentOrg ? '└ ' : ''}{d.name}</td>
                  <td>{d.parentOrg ?? '(루트)'}</td>
                  <td>{d.taxAgentNo}</td>
                  <td>{d.manager}</td>
                  <td className="c"><span className={`badge ${d.status === 'ACTIVE' ? 'b-ok' : 'b-gray'}`}>{d.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    if (tab === 1) {
      return (
        <table className="grid">
          <thead><tr><th>이용회사</th><th>담당자</th><th>기장 Role</th><th>시작일</th><th>종료일</th><th className="c">상태</th></tr></thead>
          <tbody>
            {assignCrud.rows.map((row, idx) => {
              const d = row.data as Record<string, string>;
              return (
                <tr key={row.id} className={`clickable${assignCrud.selected === idx ? ' sel' : ''}`} onClick={() => assignCrud.setSelected(idx)}>
                  <td>{d.tenant}</td>
                  <td>{d.assignee}</td>
                  <td className="mono">{d.role}</td>
                  <td>{d.startDate}</td>
                  <td>{d.endDate}</td>
                  <td className="c"><span className={`badge ${d.status === 'ASSIGNED' ? 'b-ok' : d.status === 'ENDED' ? 'b-gray' : 'b-warn'}`}>{d.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    return (
      <table className="grid">
        <thead><tr><th>CIDR</th><th>설명</th><th>등록자</th><th className="c">상태</th></tr></thead>
        <tbody>
          {ipCrud.rows.map((row, idx) => {
            const d = row.data as Record<string, string>;
            return (
              <tr key={row.id} className={`clickable${ipCrud.selected === idx ? ' sel' : ''}`} onClick={() => ipCrud.setSelected(idx)}>
                <td className="mono">{d.cidr}</td>
                <td>{d.label}</td>
                <td>{d.addedBy}</td>
                <td className="c"><span className={`badge ${d.status === 'ACTIVE' ? 'b-ok' : 'b-gray'}`}>{d.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <ScreenShell
      title="운영조직 도메인"
      screenId="OP-02"
      breadcrumb={['운영콘솔', '관리회사·조직', '운영조직 도메인']}
      titleRight={<>OperatorOrg · TenantAssignment · ConsoleIpAllowlist</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>운영 조직 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>담당 배정 <span className="tno">2</span></div>
        <div className={`tab${tab === 2 ? ' on' : ''}`} onClick={() => setTab(2)}>콘솔 IP 허용목록 <span className="tno">3</span></div>
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
        <QValue><input placeholder={tab === 0 ? '조직코드/조직명' : tab === 1 ? '회사/담당자' : 'CIDR/설명'} /> <span className="lens">⌕</span></QValue>
        {tab === 2 && (<><QLabel>주의</QLabel><QValue off>본인 접속 IP 를 제외하면 잠길 수 있음 — 자기 잠금 방지 검증</QValue></>)}
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">{renderGrid()}</div>
          {crud.form}
          <StatusBar
            message={tab === 0 ? '조직 계층은 순환참조 금지 · 변경은 감사로그 기록' : tab === 1 ? '작성자≠검토자 SOD — 동일인에게 PREPARER+REVIEWER 동시 배정 차단' : 'CONSOLE_IP_BLOCKED — 허용목록 외 IP 는 운영 콘솔 접근 차단'}
            count={`${crud.rows.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="운영자 Role 체계">운영 총괄 / 운영 관리자 / 고객 지원 / 기준정보 운영 / 기장(PREPARER·REVIEWER·MANAGER) / SEC_ADMIN / AUDITOR / BILLING</InfoBox>
          <InfoBox title="가드레일">조직 순환참조 금지<br />IP 변경은 Step-up + 이력 append-only<br />담당 이관은 TenantAssignment 워크플로</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '관리회사 운영 조직 계층, 이용회사 담당 배정, 운영 콘솔 IP 허용목록을 관리한다.' },
          { label: '입력 필드', body: '조직: orgCode, 조직명, 상위조직, 세무대리 등록번호. 배정: 이용회사, 담당자, 기장 Role, 기간. IP: CIDR, 설명.' },
          { label: '기능', body: '조직 CRUD(트리), 담당 배정·이관, IP 허용목록 CRUD, 변경이력 조회.' },
          { label: '검증', body: '조직 순환참조 금지, SOD(작성자≠검토자), 자기 잠금 방지, Step-up.' },
          { label: '산출물', body: 'OperatorOrg, OperatorOrgUnit, TenantAssignment, ConsoleIpAllowlist, OperatorActivityLog.' },
          { label: '연계', body: 'OP-00 운영 진입(담당 배정 기반 노출), OP-08 기장 워크벤치, OP-10 감사로그.' },
        ]}
      />
    </ScreenShell>
  );
}
