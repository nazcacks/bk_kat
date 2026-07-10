import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { type DialogField, type DialogValues } from '../../components/frame/EditDialog';
import EditableForm from '../../components/frame/EditableForm';
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

type EditMode = 'create' | 'edit' | null;

/** OP-05C 시스템 공통코드 관리 — 마스터/세부 화면 내 직접 편집 CRUD (실제 API) */
export default function CommonCodePage() {
  const [groups, setGroups] = useState<CommonCodeGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [domain, setDomain] = useState('전체');
  const [useYn, setUseYn] = useState('전체');

  // 마스터/세부 인라인 편집 상태
  const [groupEditing, setGroupEditing] = useState<EditMode>(null);
  const [groupDraft, setGroupDraft] = useState<DialogValues>({});
  const [groupError, setGroupError] = useState<string | null>(null);
  const [itemEditing, setItemEditing] = useState<EditMode>(null);
  const [itemDraft, setItemDraft] = useState<DialogValues>({});
  const [itemError, setItemError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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

  const cancelAll = () => {
    setGroupEditing(null);
    setItemEditing(null);
    setGroupError(null);
    setItemError(null);
  };

  // ── 마스터(코드그룹) 인라인 편집 ─────────────────────────────
  const startGroupCreate = () => {
    cancelAll();
    setGroupDraft({ groupCode: '', groupName: '', nameEn: '', domain: DOMAINS[0], policy: 'ADMIN_MANAGED', description: '' });
    setGroupEditing('create');
  };

  const startGroupEdit = () => {
    if (!sel) return window.alert('수정할 코드그룹을 선택하세요.');
    cancelAll();
    setGroupDraft({ groupCode: sel.groupCode, groupName: sel.groupName, nameEn: sel.nameEn ?? '', domain: sel.domain ?? DOMAINS[0], policy: sel.policy ?? 'ADMIN_MANAGED', description: sel.description ?? '' });
    setGroupEditing('edit');
  };

  const saveGroup = async () => {
    if (!groupEditing) return window.alert('[마스터 추가] 또는 [마스터 수정] 으로 편집을 시작한 뒤 저장하세요.');
    for (const f of GROUP_FIELDS) {
      if (f.required && !String(groupDraft[f.name] ?? '').trim()) {
        setGroupError(`'${f.label}' 은(는) 필수 입력입니다.`);
        return;
      }
    }
    setSaving(true);
    setGroupError(null);
    const payload = {
      groupName: String(groupDraft.groupName),
      nameEn: String(groupDraft.nameEn ?? ''),
      domain: String(groupDraft.domain ?? ''),
      policy: String(groupDraft.policy ?? ''),
      description: String(groupDraft.description ?? ''),
    };
    try {
      if (groupEditing === 'create') {
        await createCodeGroup({ groupCode: String(groupDraft.groupCode), ...payload } as Parameters<typeof createCodeGroup>[0]);
        setSelectedGroup(String(groupDraft.groupCode));
      } else if (sel) {
        await updateCodeGroup(sel.groupCode, payload as Parameters<typeof updateCodeGroup>[1]);
      }
      setGroupEditing(null);
      await reload();
    } catch (e) {
      setGroupError(e instanceof Error ? e.message : '마스터 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const removeGroup = async () => {
    if (!sel) return window.alert('삭제할 코드그룹을 선택하세요.');
    if (!window.confirm(`코드그룹 '${sel.groupCode}' 를 삭제하시겠습니까?\n세부 코드가 남아 있으면 차단됩니다.`)) return;
    try {
      await deleteCodeGroup(sel.groupCode);
      setSelectedGroup(null);
      cancelAll();
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  // ── 세부(코드항목) 인라인 편집 ───────────────────────────────
  const startItemCreate = () => {
    if (!sel) return window.alert('코드그룹을 먼저 선택하세요. (COMMON_CODE_GROUP_REQUIRED)');
    cancelAll();
    setItemDraft({ code: '', name: '', sortOrder: items.length + 1, isActive: true });
    setItemEditing('create');
  };

  const startItemEdit = () => {
    if (!sel || !selItem) return window.alert('수정할 세부 코드를 선택하세요.');
    cancelAll();
    setItemDraft({ code: selItem.code, name: selItem.name, sortOrder: selItem.sortOrder, isActive: selItem.isActive });
    setItemEditing('edit');
  };

  const saveItem = async () => {
    if (!itemEditing) return window.alert('[세부 추가] 또는 [세부 수정] 으로 편집을 시작한 뒤 저장하세요.');
    if (!sel) return;
    for (const f of ITEM_FIELDS) {
      if (f.required && !String(itemDraft[f.name] ?? '').trim()) {
        setItemError(`'${f.label}' 은(는) 필수 입력입니다.`);
        return;
      }
    }
    setSaving(true);
    setItemError(null);
    try {
      if (itemEditing === 'create') {
        await createCodeItem(sel.groupCode, { code: String(itemDraft.code), name: String(itemDraft.name), sortOrder: Number(itemDraft.sortOrder ?? 0) });
      } else if (selItem) {
        await updateCodeItem(sel.groupCode, selItem.code, { name: String(itemDraft.name), sortOrder: Number(itemDraft.sortOrder ?? 0), isActive: !!itemDraft.isActive });
      }
      setItemEditing(null);
      await reload();
    } catch (e) {
      setItemError(e instanceof Error ? e.message : '세부 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async () => {
    if (!sel || !selItem) return window.alert('삭제할 세부 코드를 선택하세요.');
    if (!window.confirm(`코드 '${sel.groupCode}.${selItem.code}' 를 삭제하시겠습니까?`)) return;
    try {
      await deleteCodeItem(sel.groupCode, selItem.code);
      setSelectedItem(null);
      cancelAll();
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
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
            <ABtn onClick={startGroupCreate}>마스터 추가</ABtn>
            <ABtn onClick={startGroupEdit}>마스터 수정</ABtn>
            <ABtn variant="red" onClick={() => void removeGroup()}>마스터 삭제</ABtn>
            <ABtn variant="dark" onClick={() => void saveGroup()}>마스터 저장</ABtn>
          </>
        }
      >
        <QLabel>마스터 검색</QLabel>
        <QValue><input placeholder="코드그룹/그룹명" /> <span className="lens">⌕</span></QValue>
        <QLabel>도메인</QLabel>
        <Seg options={['전체', 'AUTH', 'TENANT', 'MENU', 'BATCH', 'SECURITY', 'JOURNAL', 'VAT', 'REPORT']} value={domain} onChange={(v) => { setDomain(v); setSelectedGroup(null); cancelAll(); }} />
        <QLabel>적용범위</QLabel>
        <QValue>GLOBAL/PLAN/TENANT <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane">
          <div className="lp-t">마스터: 코드그룹 <span className="cnt">{groups.length}건</span></div>
          <div className="ptree">
            {visibleGroups.map((g) => (
              <div
                key={g.groupCode}
                className={`tnode lv1${sel?.groupCode === g.groupCode ? ' on' : ''}`}
                onClick={() => { setSelectedGroup(g.groupCode); cancelAll(); }}
              >
                {g.groupName} <span className="cnt">{g.groupCode} · {g.items.length}건</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mock-main">
          {groupEditing ? (
            <EditableForm
              fields={GROUP_FIELDS}
              values={groupDraft}
              mode={groupEditing}
              onChange={(name, v) => setGroupDraft((prev) => ({ ...prev, [name]: v }))}
              onSave={() => void saveGroup()}
              onCancel={cancelAll}
              error={groupError}
              saving={saving}
              columns={3}
            />
          ) : (
            <div className="formgrid c3 label-left">
              <div className="ff"><label>코드그룹</label><div className="fv ro">{sel?.groupCode ?? '-'}</div></div>
              <div className="ff"><label>그룹 국문명</label><div className="fv ro">{sel?.groupName ?? '-'}</div></div>
              <div className="ff"><label>도메인</label><div className="fv ro">{sel?.domain ?? '-'}</div></div>
              <div className="ff"><label>그룹 영문명</label><div className="fv ro">{sel?.nameEn ?? '-'}</div></div>
              <div className="ff"><label>변경정책</label><div className="fv ro">{sel?.policy ?? '-'}</div></div>
              <div className="ff"><label>발행버전</label><div className="fv ro">v21</div></div>
            </div>
          )}
          <div className="qbar">
            <span className="qlabel">세부 검색</span>
            <span className="qv"><input placeholder="코드/국문명" /> <span className="lens">⌕</span></span>
            <span className="qlabel">사용여부</span>
            <Seg options={['전체', 'Y', 'N']} value={useYn} onChange={setUseYn} />
            <span className="qright">
              <ABtn onClick={startItemCreate}>세부 추가</ABtn>
              <ABtn onClick={startItemEdit}>세부 수정</ABtn>
              <ABtn variant="red" onClick={() => void removeItem()}>세부 삭제</ABtn>
              <ABtn variant="dark" onClick={() => void saveItem()}>세부 저장</ABtn>
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
                    onClick={() => { setSelectedItem(item.code); setItemEditing(null); setItemError(null); }}
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
          {itemEditing && (
            <EditableForm
              fields={ITEM_FIELDS}
              values={itemDraft}
              mode={itemEditing}
              onChange={(name, v) => setItemDraft((prev) => ({ ...prev, [name]: v }))}
              onSave={() => void saveItem()}
              onCancel={cancelAll}
              error={itemError}
              saving={saving}
              columns={3}
            />
          )}
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
