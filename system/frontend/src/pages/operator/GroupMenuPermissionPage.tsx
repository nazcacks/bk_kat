import { useCallback, useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { fetchFlatMenus } from '../../api/menus';
import {
  createResource,
  listResources,
  updateResource,
  type ResourceRow,
} from '../../api/resources';
import type { FlatMenu } from '../../types';

type Policy = 'INHERIT' | 'ALLOW' | 'DENY';
const POLICIES: Policy[] = ['INHERIT', 'ALLOW', 'DENY'];

interface GroupRow {
  groupCode?: string;
  nameKo?: string;
  groupType?: string;
  defaultRole?: string;
  memberCount?: number;
}

interface PermissionData {
  groupCode?: string;
  permissions?: Record<string, Policy>;
}

/**
 * OP-06P 그룹별 메뉴권한 — 사용자그룹별 메뉴 INHERIT/ALLOW/DENY 부여.
 * 정책 클릭 즉시 저장(공통 리소스 group-menu-permission, 감사로그 자동 기록).
 * 평가 원칙: 명시적 DENY 우선, 권한 없는 메뉴는 미노출 (설계 4.3).
 */
export default function GroupMenuPermissionPage() {
  const [groups, setGroups] = useState<ResourceRow<GroupRow>[]>([]);
  const [perms, setPerms] = useState<ResourceRow<PermissionData>[]>([]);
  const [menus, setMenus] = useState<FlatMenu[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [channel, setChannel] = useState('OP');
  const [saving, setSaving] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const [g, p, m] = await Promise.all([
      listResources<GroupRow>('user-group', [
        { groupCode: 'SEC-OPS', nameKo: '보안운영팀', groupType: 'SECURITY', defaultRole: 'SEC_ADMIN', memberCount: 12 },
        { groupCode: 'CS-TEAM', nameKo: '고객지원팀', groupType: 'OPERATOR_ORG', defaultRole: 'SUPPORT', memberCount: 28 },
      ]),
      listResources<PermissionData>('group-menu-permission', [
        { groupCode: 'SEC-OPS', permissions: { 'OP-08': 'DENY', 'OP-10': 'ALLOW', 'OP-12': 'ALLOW' } },
      ]),
      fetchFlatMenus(),
    ]);
    setGroups(g);
    setPerms(p);
    setMenus(m);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const selGroup = groups[selectedGroup];
  const groupCode = String(selGroup?.data.groupCode ?? '');
  const permRow = perms.find((r) => r.data.groupCode === groupCode);
  const permissions: Record<string, Policy> = (permRow?.data.permissions as Record<string, Policy>) ?? {};

  /** 채널의 업무영역 GROUP 메뉴 (2뎁스) */
  const areaMenus = menus.filter((m) => m.parentCode === channel && m.menuType === 'GROUP');

  const policyOf = (menuCode: string): Policy => permissions[menuCode] ?? 'INHERIT';

  /** 정책 클릭 → 즉시 저장 (upsert, 감사로그 자동 기록) */
  const setPolicy = async (menuCode: string, policy: Policy) => {
    if (!selGroup) return window.alert('좌측에서 사용자그룹을 먼저 선택하세요.');
    const next = { ...permissions, [menuCode]: policy };
    if (policy === 'INHERIT') delete next[menuCode]; // INHERIT = 명시 정책 제거
    setSaving(menuCode);
    try {
      if (permRow && !permRow.id.startsWith('mock-')) {
        await updateResource('group-menu-permission', permRow.id, { groupCode, permissions: next });
      } else {
        await createResource('group-menu-permission', { groupCode, permissions: next });
      }
      setLastSaved(`${groupCode} · ${menuCode} → ${policy}`);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '권한 저장에 실패했습니다. 백엔드 기동 여부를 확인하세요.');
    } finally {
      setSaving(null);
    }
  };

  const denyCount = Object.values(permissions).filter((p) => p === 'DENY').length;
  const allowCount = Object.values(permissions).filter((p) => p === 'ALLOW').length;

  return (
    <ScreenShell
      title="그룹별 메뉴권한"
      screenId="OP-06P"
      breadcrumb={['운영콘솔', '사용자·인증·권한', '그룹별 메뉴권한']}
      titleRight={<><span className="badge b-block">DENY 우선</span> · MenuVersion v42 · PUBLISHED</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow" onClick={() => void reload()}>🔍 조회</ABtn>
            <ABtn>영향 분석</ABtn>
          </>
        }
      >
        <QLabel>그룹</QLabel>
        <QValue>{String(selGroup?.data.nameKo ?? '좌측에서 선택')} <span className="lens">▾</span></QValue>
        <QLabel>채널</QLabel>
        <Seg options={['OP', 'TN', 'CO']} value={channel} onChange={setChannel} />
        <QLabel>저장 방식</QLabel>
        <QValue off>정책 클릭 시 즉시 저장 · 감사로그 기록</QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane">
          <div className="lp-t">사용자그룹 <span className="cnt">{groups.length}건</span></div>
          <div className="ptree">
            {groups.map((row, idx) => {
              const g = row.data;
              return (
                <div
                  key={row.id}
                  className={`tnode lv1${selectedGroup === idx ? ' on' : ''}`}
                  onClick={() => setSelectedGroup(idx)}
                >
                  ▸ {String(g.nameKo ?? g.groupCode)} <span className="cnt">{String(g.groupCode)} · {String(g.memberCount ?? 0)}명</span>
                </div>
              );
            })}
            {groups.length === 0 && <div className="tnode dim">그룹이 없습니다 — 사용자그룹 관리에서 등록하세요</div>}
          </div>
        </div>
        <div className="mock-main">
          <div className="gridwrap">
            <table className="grid">
              <thead>
                <tr><th>메뉴</th><th>Role 권한</th><th>그룹 정책 (클릭하여 변경)</th><th>최종 노출</th><th>진입</th></tr>
              </thead>
              <tbody>
                {areaMenus.map((m) => {
                  const policy = policyOf(m.menuCode);
                  const visible = policy !== 'DENY';
                  return (
                    <tr key={m.menuCode} className={policy === 'DENY' ? 'sel' : ''}>
                      <td>{m.menuCode} {m.name}{m.requiresStepUp ? ' 🔒' : ''}</td>
                      <td><span className="badge b-ok">ALLOW</span> <span className="dim">RoleMenuPermission</span></td>
                      <td>
                        <span className="seg">
                          {POLICIES.map((p) => (
                            <span
                              key={p}
                              className={policyOf(m.menuCode) === p ? 'on' : ''}
                              onClick={() => void setPolicy(m.menuCode, p)}
                              role="button"
                            >
                              {saving === m.menuCode && policyOf(m.menuCode) !== p ? '…' : p}
                            </span>
                          ))}
                        </span>
                      </td>
                      <td>{visible ? '보임' : <span className="red">숨김</span>}</td>
                      <td>{!visible ? '불가' : m.requiresStepUp ? 'Step-up 후' : '가능'}</td>
                    </tr>
                  );
                })}
                {areaMenus.length === 0 && <tr><td colSpan={5} className="dim">해당 채널의 메뉴가 없습니다</td></tr>}
              </tbody>
            </table>
          </div>
          <StatusBar
            tone="warn"
            message={lastSaved ? `✓ 저장됨: ${lastSaved} — DENY 우선, Role 허용이 있어도 미노출` : 'DENY 우선 — 같은 사용자의 다른 그룹 ALLOW가 있어도 DENY 메뉴는 미노출'}
            count={`${groupCode || '-'} · ALLOW ${allowCount} · DENY ${denyCount} · 나머지 INHERIT`}
          />
        </div>
        <RightPanel>
          <InfoBox title="선택 그룹">
            {selGroup ? (
              <>
                <KV k="그룹" v={String(selGroup.data.nameKo ?? '-')} />
                <KV k="코드" v={groupCode} />
                <KV k="기본Role" v={String(selGroup.data.defaultRole ?? '-')} />
              </>
            ) : '그룹을 선택하세요'}
          </InfoBox>
          <InfoBox title="평가 순서">1. MenuVersion PUBLISHED<br />2. <b>그룹 메뉴권한 (DENY 우선)</b><br />3. Role 메뉴권한<br />4. ACTION · 데이터범위 · 민감정보</InfoBox>
          <InfoBox title="충돌 검증"><span className="badge b-warn">USER_GROUP_MENU_CONFLICT</span><br />ALLOW/DENY 충돌 시 DENY 우선 기록</InfoBox>
          <InfoBox title="API"><code>PUT /api/resources/group-menu-permission/:id</code></InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '사용자그룹별로 메뉴 노출 정책(INHERIT/ALLOW/DENY)을 부여해 실제 메뉴 노출과 진입을 통제한다.' },
          { label: '입력 필드', body: '사용자그룹, 채널(OP/TN/CO), 메뉴, 정책(INHERIT/ALLOW/DENY).' },
          { label: '기능', body: '그룹 선택, 채널별 메뉴 목록 조회, 정책 클릭 즉시 저장, 최종 노출·진입 미리보기, 영향 분석.' },
          { label: '검증', body: '메뉴 버전 PUBLISHED 확인, 다중 그룹 충돌 시 DENY 우선, 부모 메뉴 DENY 시 하위 미노출.' },
          { label: '산출물', body: 'UserGroupMenuPermission (공통 리소스 group-menu-permission), 감사로그(DataChangeLog).' },
          { label: '연계', body: 'OP-06G 사용자그룹, OP-06D 메뉴 마스터, OP-06C Role·권한, /api/me/menus, PermissionEvaluationCache.' },
        ]}
      />
    </ScreenShell>
  );
}
