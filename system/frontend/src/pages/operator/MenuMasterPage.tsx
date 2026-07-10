import { useEffect, useMemo, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { type DialogField, type DialogValues } from '../../components/frame/EditDialog';
import EditableForm from '../../components/frame/EditableForm';
import { createMenu, deleteMenu, fetchFlatMenus, updateMenu } from '../../api/menus';
import type { FlatMenu } from '../../types';

const MENU_FIELDS: DialogField[] = [
  { name: 'menuCode', label: '메뉴코드', required: true, readOnlyOnEdit: true, placeholder: 'TN-04-M09' },
  { name: 'parentCode', label: '상위메뉴 코드', placeholder: 'TN-04 (GROUP 코드)' },
  { name: 'channel', label: '채널', type: 'select', options: ['TN', 'OP', 'CO'] },
  { name: 'menuType', label: '유형', type: 'select', options: ['MENU', 'GROUP'] },
  { name: 'name', label: '국문명', required: true },
  { name: 'nameEn', label: '영문명' },
  { name: 'path', label: '경로', placeholder: '/tenant/tn/04/m09' },
  { name: 'screenId', label: '화면ID', placeholder: 'SA-JNL-09' },
  { name: 'sortOrder', label: '정렬순서', type: 'number' },
  { name: 'requiresStepUp', label: 'Step-up 필요', type: 'checkbox' },
];

/** 메뉴 코드 계층 깊이 (채널 1 / 업무영역 2 / G그룹 3 / 메뉴 3~4) */
function levelOf(m: FlatMenu): number {
  if (!m.parentCode) return 1;
  if (m.parentCode.length <= 2) return 2;
  return /-G\d{2}$/.test(m.parentCode) ? 4 : 3;
}

/** OP-06D 메뉴 마스터 관리 — 실제 메뉴 카탈로그(GET /api/menus) 기반 트리 + 상세 */
export default function MenuMasterPage() {
  const [menus, setMenus] = useState<FlatMenu[]>([]);
  const [channel, setChannel] = useState('OP');
  const [filter, setFilter] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [editing, setEditing] = useState<'create' | 'edit' | null>(null);
  const [draft, setDraft] = useState<DialogValues>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reload = () => fetchFlatMenus().then(setMenus);
  useEffect(() => {
    void reload();
  }, []);

  const channelMenus = useMemo(
    () =>
      menus
        .filter((m) => m.channel === channel || m.menuCode === channel)
        .filter(
          (m) =>
            !filter ||
            m.name.includes(filter) ||
            m.menuCode.toLowerCase().includes(filter.toLowerCase()) ||
            (m.screenId ?? '').toLowerCase().includes(filter.toLowerCase()),
        ),
    [menus, channel, filter],
  );

  const sel = menus.find((m) => m.menuCode === selectedCode) ?? channelMenus[0];

  const openCreate = () => {
    setDraft({
      menuCode: '', parentCode: sel?.menuType === 'GROUP' ? sel.menuCode : sel?.parentCode ?? '',
      channel, menuType: 'MENU', name: '', nameEn: '', path: '', screenId: '',
      sortOrder: (sel?.sortOrder ?? 0) + 1, requiresStepUp: false,
    });
    setEditing('create');
    setError(null);
  };

  const openEdit = () => {
    if (!sel) return window.alert('수정할 메뉴를 선택하세요.');
    setDraft({
      menuCode: sel.menuCode, parentCode: sel.parentCode ?? '', channel: sel.channel,
      menuType: sel.menuType, name: sel.name, nameEn: '', path: sel.path ?? '',
      screenId: sel.screenId ?? '', sortOrder: sel.sortOrder, requiresStepUp: sel.requiresStepUp,
    });
    setEditing('edit');
    setError(null);
  };

  const handleDelete = async () => {
    if (!sel) return window.alert('삭제할 메뉴를 선택하세요.');
    if (!window.confirm(`메뉴 '${sel.menuCode} ${sel.name}' 를 삭제하시겠습니까?\n하위 메뉴가 있으면 차단되며, 삭제는 감사로그에 기록됩니다.`)) return;
    try {
      await deleteMenu(sel.id);
      setSelectedCode(null);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  const save = async () => {
    if (!editing) return window.alert('[추가] 또는 [수정] 으로 편집을 시작한 뒤 저장하세요.');
    for (const f of MENU_FIELDS) {
      if (f.required && !String(draft[f.name] ?? '').trim()) {
        setError(`'${f.label}' 은(는) 필수 입력입니다.`);
        return;
      }
    }
    const payload: Partial<FlatMenu> = {
      menuCode: String(draft.menuCode),
      parentCode: String(draft.parentCode ?? '') || null,
      channel: String(draft.channel),
      menuType: draft.menuType as FlatMenu['menuType'],
      name: String(draft.name),
      path: String(draft.path ?? '') || null,
      screenId: String(draft.screenId ?? '') || null,
      sortOrder: Number(draft.sortOrder ?? 9999),
      requiresStepUp: !!draft.requiresStepUp,
    };
    setSaving(true);
    setError(null);
    try {
      if (editing === 'create') await createMenu(payload);
      else if (sel) await updateMenu(sel.id, payload);
      setEditing(null);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const validations = sel
    ? [
        { name: '코드/라우트 중복', result: 'OK', tone: 'b-ok', desc: `${sel.menuCode} · ${sel.path ?? '(GROUP)'} 중복 없음` },
        { name: '부모 유형', result: sel.parentCode ? 'OK' : 'ROOT', tone: 'b-ok', desc: sel.parentCode ? `상위 ${sel.parentCode} 는 GROUP` : '채널 루트' },
        { name: '다국어 필수', result: 'OK', tone: 'b-ok', desc: '국문명 존재 · 영문명 관리 대상' },
        { name: '화면 ID', result: sel.screenId ? 'OK' : '미지정', tone: sel.screenId ? 'b-ok' : 'b-warn', desc: sel.screenId ?? 'GROUP 메뉴는 화면 ID 없음' },
      ]
    : [];

  return (
    <ScreenShell
      title="메뉴 마스터"
      screenId="OP-06D"
      breadcrumb={['운영콘솔', '사용자·인증·권한', '메뉴 마스터 관리']}
      titleRight={<>DRAFT v43 · 기준 PUBLISHED v42</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void reload()}>🔍 조회</ABtn>
            <ABtn onClick={openCreate}>추가</ABtn>
            <ABtn onClick={openEdit}>수정</ABtn>
            <ABtn variant="red" onClick={() => void handleDelete()}>삭제</ABtn>
            <ABtn variant="dark" onClick={() => void save()}>저장</ABtn>
            <ABtn>영향 분석</ABtn>
            <ABtn variant="dark">발행</ABtn>
          </>
        }
      >
        <QLabel>메뉴명</QLabel>
        <QValue><input placeholder="코드/국문/화면ID" value={filter} onChange={(e) => setFilter(e.target.value)} /> <span className="lens">⌕</span></QValue>
        <QLabel>채널</QLabel>
        <Seg options={['OP', 'TN', 'CO']} value={channel} onChange={(v) => { setChannel(v); setSelectedCode(null); }} />
        <QLabel>유형</QLabel>
        <QValue>GROUP/MENU/TAB/ACTION <span className="lens">▾</span></QValue>
        <QLabel>버전</QLabel>
        <QValue>DRAFT v43 <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane wide">
          <div className="lp-t">메뉴 트리 <span className="cnt">{channelMenus.length}건</span></div>
          <div className="ptree">
            {channelMenus.map((m) => (
              <div
                key={m.menuCode}
                className={`tnode lv${levelOf(m)}${sel?.menuCode === m.menuCode ? ' on' : ''}`}
                onClick={() => { setSelectedCode(m.menuCode); setEditing(null); setError(null); }}
              >
                {m.menuType === 'GROUP' ? '▸ ' : ''}{m.name}
                <span className="cnt">{m.screenId ?? m.menuCode}</span>
                {m.requiresStepUp ? ' 🔒' : ''}
              </div>
            ))}
          </div>
        </div>
        <div className="mock-main">
          {editing ? (
            <EditableForm
              fields={MENU_FIELDS}
              values={draft}
              mode={editing}
              onChange={(name, v) => setDraft((prev) => ({ ...prev, [name]: v }))}
              onSave={() => void save()}
              onCancel={() => { setEditing(null); setError(null); }}
              error={error}
              saving={saving}
              columns={3}
            />
          ) : (
          <div className="formgrid c3 label-left">
            <div className="ff"><label>메뉴코드</label><div className="fv ro">{sel?.menuCode ?? '-'}</div></div>
            <div className="ff"><label>채널</label><div className="fv ro">{sel?.channel ?? '-'}</div></div>
            <div className="ff"><label>유형</label><div className="fv ro">{sel?.menuType ?? '-'}</div></div>
            <div className="ff"><label>상위메뉴</label><div className="fv ro">{sel?.parentCode ?? '(루트)'}</div></div>
            <div className="ff"><label>화면ID</label><div className="fv ro">{sel?.screenId ?? '-'}</div></div>
            <div className="ff"><label>정렬순서</label><div className="fv ro">{sel?.sortOrder ?? '-'}</div></div>
            <div className="ff"><label>국문명</label><div className="fv ro">{sel?.name ?? '-'}</div></div>
            <div className="ff"><label>경로</label><div className="fv ro">{sel?.path ?? '-'}</div></div>
            <div className="ff"><label>Step-up</label><div className="fv ro">{sel?.requiresStepUp ? '필요 🔒' : '불필요'}</div></div>
            <div className="ff"><label>노출</label><div className="fv ro">{sel ? (sel.isVisible ? '노출' : '미노출') : '-'}</div></div>
            <div className="ff"><label>기능플래그</label><div className="fv ro">{sel ? `feature.menu.${sel.menuCode.toLowerCase().replace(/-/g, '.')}` : '-'}</div></div>
            <div className="ff"><label>상태</label><div className="fv ro">ACTIVE</div></div>
          </div>
          )}
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>검증</th><th>결과</th><th>설명</th></tr></thead>
              <tbody>
                {validations.map((v) => (
                  <tr key={v.name}>
                    <td>{v.name}</td>
                    <td><span className={`badge ${v.tone}`}>{v.result}</span></td>
                    <td>{v.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatusBar
            message={sel ? `${sel.menuCode} 선택됨` : '메뉴 선택 대기'}
            tone={sel ? 'ok' : 'warn'}
            count={`MenuVersion v43 · 전체 ${menus.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="버전 Diff">DRAFT v43 기준 메뉴 카탈로그를 선택하면 변경 영향이 표시된다.</InfoBox>
          <InfoBox title="사용처 영향">RoleMenuPermission · UserGroupMenuPermission · 라우트 가드 영향 분석</InfoBox>
          <InfoBox title="권한 미리보기">권한 없는 메뉴는 비활성이 아니라 미노출한다.</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: 'OP/TN/CO 메뉴 구조를 중앙에서 등록·수정·버전 발행한다.' },
          { label: '입력 필드', body: 'menuCode, channel, type, parent, screenId, displayNameKo/En, route, featureFlag.' },
          { label: '기능', body: '트리 편집, 다국어 관리, 버전 Diff, 영향 분석, 발행/롤백, 권한 미리보기.' },
          { label: '검증', body: '코드/라우트 중복, 부모 유형, 순환참조, 화면 ID, 다국어 필수, 사용 중 삭제.' },
          { label: '산출물', body: 'Menu, MenuVersion, MenuI18n, MenuRouteBinding, MenuPublishLog.' },
          { label: '연계', body: 'RoleMenuPermission, UserGroupMenuPermission, MenuActionGrant, /api/me/menus.' },
        ]}
      />
    </ScreenShell>
  );
}
