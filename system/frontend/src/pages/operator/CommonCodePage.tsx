import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import EditDialog, { type DialogField, type DialogValues } from '../../components/frame/EditDialog';
import {
  createCodeGroup, createCodeItem, deleteCodeGroup, deleteCodeItem,
  fetchCommonCodes, updateCodeGroup, updateCodeItem,
} from '../../api/codes';
import type { CommonCodeGroup } from '../../types';

const DOMAINS = ['AUTH', 'TENANT', 'MENU', 'PERMISSION', 'BATCH', 'SECURITY', 'JOURNAL', 'VAT', 'REPORT', 'ACCOUNTING', 'OPERATION', 'STANDARD', 'BILLING', 'ACCESS', 'AUDIT', 'AI', 'NOTIFICATION', 'ERROR', 'RETENTION', 'MASTERDATA', 'LEDGER', 'TREASURY', 'EVIDENCE', 'COST', 'TAX', 'ASSET', 'CONTRACT', 'APPROVAL'];

const GROUP_FIELDS: DialogField[] = [
  { name: 'groupCode', label: '코드그룹', required: true, readOnlyOnEdit: true, placeholder: 'JOURNAL_TYPE' },
  { name: 'groupName', label: '그룹 국문명', required: true },
  { name: 'nameEn', label: '그룹 영문명' },
  { name: 'domain', label: '도메인', type: 'select', options: DOMAINS },
  { name: 'policy', label: '변경정책', type: 'select', options: ['ADMIN_MANAGED', 'SYSTEM_LOCKED', 'STANDARD_MANAGED'] },
  { name: 'description', label: '설명', type: 'textarea' },
];

const ITEM_FIELDS: DialogField[] = [
  { name: 'code', label: '코드', required: true, readOnlyOnEdit: true, placeholder: 'TRANSFER' },
  { name: 'name', label: '국문명', required: true },
  { name: 'sortOrder', label: '정렬순서', type: 'number' },
  { name: 'isActive', label: '사용여부', type: 'checkbox' },
];

/** OP-05C 시스템 공통코드 관리 — 마스터(코드그룹)/세부(코드항목) CRUD (실제 API) */
export default function CommonCodePage() {
  const [groups, setGroups] = useState<CommonCodeGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [domain, setDomain] = useState('전체');
  const [useYn, setUseYn] = useState('전체');
  const [dialog, setDialog] = useState<'group-create' | 'group-edit' | 'item-create' | 'item-edit' | null>(null);
  const [initial, setInitial] = useState<DialogValues>({});

  const reload = () => fetchCommonCodes().then(setGroups);
  useEffect(() => {
    void reload();
  }, []);

  const visibleGroups = groups.filter((g) => domain === '전체' || g.domain === domain);
  const sel = visibleGroups.find((g) => g.groupCode === selectedGroup) ?? visibleGroups[0];
  const items = (sel?.items ?? []).filter(
    (i) => useYn === '전체' || (useYn === 'Y') === i.isActive,
  );
  const selItem = items.find((i) => i.code === selectedItem) ?? items[0];

  const openDialog = (kind: NonNullable<typeof dialog>) => {
    if (kind === 'group-create') setInitial({ groupCode: '', groupName: '', nameEn: '', domain: 'AUTH', policy: 'ADMIN_MANAGED', description: '' });
    else if (kind === 'group-edit') {
      if (!sel) return window.alert('수정할 코드그룹을 선택하세요.');
      setInitial({ groupCode: sel.groupCode, groupName: sel.groupName, nameEn: sel.nameEn ?? '', domain: sel.domain ?? 'AUTH', policy: sel.policy ?? 'ADMIN_MANAGED', description: sel.description ?? '' });
    } else if (kind === 'item-create') {
      if (!sel) return window.alert('코드그룹을 먼저 선택하세요. (COMMON_CODE_GROUP_REQUIRED)');
      setInitial({ code: '', name: '', sortOrder: items.length + 1, isActive: true });
    } else {
      if (!sel || !selItem) return window.alert('수정할 세부 코드를 선택하세요.');
      setInitial({ code: selItem.code, name: selItem.name, sortOrder: selItem.sortOrder, isActive: selItem.isActive });
    }
    setDialog(kind);
  };

  const removeGroup = async () => {
    if (!sel) return window.alert('삭제할 코드그룹을 선택하세요.');
    if (!window.confirm(`코드그룹 '${sel.groupCode}' 를 삭제하시겠습니까?\n세부 코드가 남아 있으면 차단됩니다.`)) return;
    try {
      await deleteCodeGroup(sel.groupCode);
      setSelectedGroup(null);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  const removeItem = async () => {
    if (!sel || !selItem) return window.alert('삭제할 세부 코드를 선택하세요.');
    if (!window.confirm(`코드 '${sel.groupCode}.${selItem.code}' 를 삭제하시겠습니까?`)) return;
    try {
      await deleteCodeItem(sel.groupCode, selItem.code);
      setSelectedItem(null);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  const handleSubmit = async (values: DialogValues) => {
    if (dialog === 'group-create') {
      await createCodeGroup({ groupCode: String(values.groupCode), groupName: String(values.groupName), nameEn: String(values.nameEn ?? ''), domain: String(values.domain ?? ''), policy: String(values.policy ?? ''), description: String(values.description ?? '') } as Parameters<typeof createCodeGroup>[0]);
    } else if (dialog === 'group-edit' && sel) {
      await updateCodeGroup(sel.groupCode, { groupName: String(values.groupName), nameEn: String(values.nameEn ?? ''), domain: String(values.domain ?? ''), policy: String(values.policy ?? ''), description: String(values.description ?? '') } as Parameters<typeof updateCodeGroup>[1]);
    } else if (dialog === 'item-create' && sel) {
      await createCodeItem(sel.groupCode, { code: String(values.code), name: String(values.name), sortOrder: Number(values.sortOrder ?? 0) });
    } else if (dialog === 'item-edit' && sel && selItem) {
      await updateCodeItem(sel.groupCode, selItem.code, { name: String(values.name), sortOrder: Number(values.sortOrder ?? 0), isActive: !!values.isActive });
    }
    await reload();
  };

  return (
    <ScreenShell
      title="시스템 공통코드"
      screenId="OP-05C"
      breadcrumb={['운영콘솔', '공통 표준 카탈로그', '시스템 공통코드 관리']}
      titleRight={<>CommonCodeVersion v21</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void reload()}>🔍 조회</ABtn>
            <ABtn onClick={() => openDialog('group-create')}>마스터 추가</ABtn>
            <ABtn onClick={() => openDialog('group-edit')}>마스터 수정</ABtn>
            <ABtn variant="red" onClick={() => void removeGroup()}>마스터 삭제</ABtn>
            <ABtn variant="dark" onClick={() => openDialog('group-edit')}>마스터 저장</ABtn>
          </>
        }
      >
        <QLabel>마스터 검색</QLabel>
        <QValue><input placeholder="코드그룹/그룹명" /> <span className="lens">⌕</span></QValue>
        <QLabel>도메인</QLabel>
        <Seg options={['전체', 'AUTH', 'TENANT', 'MENU', 'BATCH', 'SECURITY', 'JOURNAL', 'VAT', 'REPORT']} value={domain} onChange={(v) => { setDomain(v); setSelectedGroup(null); }} />
        <QLabel>적용범위</QLabel>
        <QValue>GLOBAL/PLAN/TENANT <span className="lens">▾</span></QValue>
        <QLabel>상태</QLabel>
        <QValue>ACTIVE/RETIRED <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane">
          <div className="lp-t">마스터: 코드그룹 <span className="cnt">{groups.length}건</span></div>
          <div className="ptree">
            {visibleGroups.map((g) => (
              <div
                key={g.groupCode}
                className={`tnode lv1${sel?.groupCode === g.groupCode ? ' on' : ''}`}
                onClick={() => setSelectedGroup(g.groupCode)}
              >
                {g.groupName} <span className="cnt">{g.groupCode} · {g.items.length}건</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mock-main">
          <div className="formgrid c3 label-left">
            <div className="ff"><label>코드그룹</label><div className="fv ro">{sel?.groupCode ?? '-'}</div></div>
            <div className="ff"><label>그룹 국문명</label><div className="fv ro">{sel?.groupName ?? '-'}</div></div>
            <div className="ff"><label>도메인</label><div className="fv ro">{sel?.domain ?? '-'}</div></div>
            <div className="ff"><label>그룹 영문명</label><div className="fv ro">{sel?.nameEn ?? '-'}</div></div>
            <div className="ff"><label>변경정책</label><div className="fv ro">{sel?.policy ?? '-'}</div></div>
            <div className="ff"><label>발행버전</label><div className="fv ro">v21</div></div>
          </div>
          <div className="qbar">
            <span className="qlabel">세부 검색</span>
            <span className="qv"><input placeholder="코드/국문명" /> <span className="lens">⌕</span></span>
            <span className="qlabel">사용여부</span>
            <Seg options={['전체', 'Y', 'N']} value={useYn} onChange={setUseYn} />
            <span className="qright">
              <ABtn variant="yellow" onClick={() => void reload()}>🔍 조회</ABtn>
              <ABtn onClick={() => openDialog('item-create')}>세부 추가</ABtn>
              <ABtn onClick={() => openDialog('item-edit')}>세부 수정</ABtn>
              <ABtn variant="red" onClick={() => void removeItem()}>세부 삭제</ABtn>
              <ABtn variant="dark" onClick={() => openDialog('item-edit')}>세부 저장</ABtn>
              <ABtn>영향 분석</ABtn>
              <ABtn variant="dark">발행</ABtn>
            </span>
          </div>
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>코드</th><th>코드그룹</th><th>국문명</th><th className="c">정렬</th><th className="c">사용여부</th><th>시작일</th><th>종료일</th></tr></thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.code}
                    className={`clickable${selItem?.code === item.code ? ' sel' : ''}`}
                    onClick={() => setSelectedItem(item.code)}
                  >
                    <td className="mono">{item.code}</td>
                    <td>{sel?.groupCode}</td>
                    <td>{item.name}</td>
                    <td className="c">{item.sortOrder}</td>
                    <td className="c"><span className={`badge ${item.isActive ? 'b-ok' : 'b-gray'}`}>{item.isActive ? 'Y' : 'N'}</span></td>
                    <td>2026-01-01</td>
                    <td>9999-12-31</td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={7} className="dim">세부 코드가 없습니다</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <StatusBar
            message={sel ? `✓ ${sel.groupCode} 선택됨` : '✓ 마스터 선택 대기'}
            count={`세부 ${items.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="마스터/세부 규칙">마스터 선택 전 세부 저장 차단<br /><span className="badge b-block">COMMON_CODE_GROUP_REQUIRED</span></InfoBox>
          <InfoBox title="발행 차이">코드그룹을 선택하면 DRAFT/PUBLISHED 차이가 표시된다.</InfoBox>
          <InfoBox title="사용처 영향">문서 검토 출처와 사용처가 표시된다.</InfoBox>
        </RightPanel>
      </div>
      <EditDialog
        open={dialog !== null}
        mode={dialog?.endsWith('create') ? 'create' : 'edit'}
        title={dialog?.startsWith('group') ? '코드그룹' : '세부 코드'}
        fields={dialog?.startsWith('group') ? GROUP_FIELDS : ITEM_FIELDS}
        initial={initial}
        onClose={() => setDialog(null)}
        onSubmit={handleSubmit}
      />
      <ScreenDetails
        items={[
          { label: '목적', body: '공통코드를 마스터(코드그룹)와 세부(코드항목) 관계로 관리하고 런타임에 일관된 정의를 제공한다.' },
          { label: '마스터 입력', body: '코드그룹, 그룹 국문명, 그룹 영문명, 도메인, 적용범위, 변경정책, 값 유형, 다국어 필수.' },
          { label: '세부 입력', body: '코드, 코드그룹, 국문명, 영문명, 정렬순서, 사용여부, 시작일, 종료일, 대체코드, 메타데이터.' },
          { label: '기능', body: '마스터/세부별 조회·추가·수정·삭제·저장, DRAFT/PUBLISHED, 가져오기/내보내기, 사용처 영향 분석.' },
          { label: '검증', body: '마스터 미선택, 코드그룹 불일치, 중복, 예약 코드 변경, 시작일/종료일, 다국어, 메타데이터 스키마 차단.' },
          { label: '산출물', body: 'CommonCodeGroup, CommonCodeItem, CommonCodeVersion, CommonCodeUsage, CommonCodeHistory.' },
        ]}
      />
    </ScreenShell>
  );
}
