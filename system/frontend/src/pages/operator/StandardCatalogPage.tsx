import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { updateResource } from '../../api/resources';

const statusTone = (s: string) =>
  s === 'PUBLISHED' ? 'b-ok' : s === 'DRAFT' ? 'b-warn' : s === 'DEPRECATED' ? 'b-block' : 'b-gray';
const distTone = (d: string) => (d === 'MANDATORY' ? 'b-block' : d === 'RECOMMENDED' ? 'b-warn' : 'b-gray');

/** OP-05-M02 표준 카탈로그 관리 (BF-08) — 버전 수명주기·배포 3모드 (설계 §6) */
export default function StandardCatalogPage() {
  const crud = useResourceCrud({
    type: 'standard',
    title: '공통 표준',
    fields: [
      { name: 'stdCode', label: '표준 코드', required: true, readOnlyOnEdit: true, placeholder: 'STD_ACCOUNT' },
      { name: 'name', label: '표준명', required: true },
      { name: 'version', label: '버전', placeholder: 'v1' },
      { name: 'status', label: '상태', type: 'select', options: ['DRAFT', 'PUBLISHED', 'DEPRECATED', 'RETIRED'] },
      { name: 'distribution', label: '배포 모드', type: 'select', options: ['MANDATORY', 'RECOMMENDED', 'OPTIONAL'] },
      { name: 'adopted', label: '채택 현황', placeholder: '0/132 테넌트' },
    ],
    fallback: [
      { stdCode: 'STD_ACCOUNT', name: '표준계정 템플릿', version: 'v12', status: 'PUBLISHED', distribution: 'MANDATORY', adopted: '132/132 테넌트' },
    ],
    labelOf: (d) => `${d.stdCode} ${d.name}`,
  });

  const sel = crud.selectedRow;
  const d = (sel?.data ?? {}) as Record<string, string>;

  /** 발행 — DRAFT → PUBLISHED (설계: 발행 시 diff 미리보기·회사별 적용이력) */
  const publish = async () => {
    if (!sel) return window.alert('발행할 표준을 선택하세요.');
    if (d.status === 'PUBLISHED') return window.alert('이미 발행된 버전입니다.');
    if (!window.confirm(`'${d.stdCode} ${d.name}' ${d.version} 을 발행하시겠습니까?\nMANDATORY 표준은 전 테넌트에 강제 적용됩니다.`)) return;
    try {
      await updateResource('standard', sel.id, { status: 'PUBLISHED', version: String(d.version).replace('-draft', '') });
      await crud.reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '발행에 실패했습니다.');
    }
  };

  return (
    <ScreenShell
      title="표준 카탈로그 관리"
      screenId="OP-05-B"
      breadcrumb={['운영콘솔', '공통 표준 카탈로그', '표준 카탈로그 관리']}
      titleRight={<>DRAFT → PUBLISHED → DEPRECATED → RETIRED</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
            <ABtn onClick={crud.openCreate}>추가</ABtn>
            <ABtn onClick={crud.openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void crud.handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void crud.save()}>저장</ABtn>
            <ABtn>diff 미리보기</ABtn>
            <ABtn variant="dark" onClick={() => void publish()}>발행</ABtn>
            <ABtn>롤백</ABtn>
          </>
        }
      >
        <QLabel>표준 검색</QLabel>
        <QValue><input placeholder="STD 코드/표준명" /> <span className="lens">⌕</span></QValue>
        <QLabel>선택</QLabel>
        <QValue>{sel ? `${d.stdCode} · ${d.version}` : '-'}</QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>표준 코드</th><th>표준명</th><th className="c">버전</th><th className="c">상태</th><th className="c">배포 모드</th><th>채택 현황</th></tr></thead>
              <tbody>
                {crud.rows.map((row, idx) => {
                  const r = row.data as Record<string, string>;
                  return (
                    <tr key={row.id} className={`clickable${crud.selected === idx ? ' sel' : ''}`} onClick={() => crud.setSelected(idx)}>
                      <td className="mono">{r.stdCode}</td>
                      <td>{r.name}</td>
                      <td className="c">{r.version}</td>
                      <td className="c"><span className={`badge ${statusTone(r.status)}`}>{r.status}</span></td>
                      <td className="c"><span className={`badge ${distTone(r.distribution)}`}>{r.distribution}</span></td>
                      <td>{r.adopted}</td>
                    </tr>
                  );
                })}
                {crud.rows.length === 0 && <tr><td colSpan={6} className="dim">표준이 없습니다 — [추가] 로 등록하세요</td></tr>}
              </tbody>
            </table>
          </div>
          {crud.form}
          <StatusBar
            tone="warn"
            message="MANDATORY 는 전 테넌트 강제 · RECOMMENDED 는 채택 권고 · OPTIONAL 은 선택 — 회사 확장은 네임스페이스 분리 + 충돌 검사"
            count={`표준 ${crud.rows.length}종`}
          />
        </div>
        <RightPanel>
          <InfoBox title="버전 수명주기 (설계 §6)">
            <KV k="DRAFT" v="작성중" />
            <KV k="PUBLISHED" v="발행·적용" />
            <KV k="DEPRECATED" v="폐기예정" />
            <KV k="RETIRED" v="퇴역" />
          </InfoBox>
          <InfoBox title="표준 종류">표준계정 · 부가세 세율 · 세법 룰 · 원천세 · 신고서식 · 공통코드 · Role/결재선 템플릿 · 현금흐름 매핑 · XBRL · 이상탐지 규칙 · 알림 템플릿 등</InfoBox>
          <InfoBox title="배포 게이트">발행 시 diff 미리보기 → 테넌트 채택(TenantStandardAdoption) → 문제 시 롤백</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '관리회사가 배포하는 공통 표준(계정·세율·서식·룰)의 버전과 배포 정책을 운영한다.' },
          { label: '입력 필드', body: '표준 코드, 표준명, 버전, 상태(DRAFT/PUBLISHED/DEPRECATED/RETIRED), 배포 모드, 채택 현황.' },
          { label: '기능', body: '표준 CRUD, 버전 발행·롤백, diff 미리보기, 테넌트 채택 현황 조회.' },
          { label: '검증', body: '발행 전 diff 확인, MANDATORY 강제 적용 경고, 유효일자·회사별 적용이력.' },
          { label: '산출물', body: 'GlobalStandard, StandardVersion, StandardItem, TenantStandardAdoption, TenantStandardExtension.' },
          { label: '연계', body: 'OP-05C 시스템 공통코드, TN-02 기초정보(회사 채택·확장), TaxRuleMaster.' },
        ]}
      />
    </ScreenShell>
  );
}
