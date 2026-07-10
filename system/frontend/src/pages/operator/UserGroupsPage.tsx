import { useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox, { KV } from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { useResourceCrud } from '../../hooks/useResourceCrud';
import { groupMemberRows, groupMenuPolicyRows } from '../../api/mock/operator';

/** OP-06G 사용자그룹 관리 — 그룹 CRUD + Role 상속 + 그룹별 메뉴 INHERIT/ALLOW/DENY */
export default function UserGroupsPage() {
  const [tab, setTab] = useState(0);
  const [groupType, setGroupType] = useState('전체');
  const [policy, setPolicy] = useState('DENY');

  const crud = useResourceCrud({
    type: 'user-group',
    title: '사용자그룹',
    fields: [
      { name: 'groupCode', label: '그룹코드', required: true, readOnlyOnEdit: true, placeholder: 'SEC-OPS' },
      { name: 'nameKo', label: '국문명', required: true },
      { name: 'nameEn', label: '영문명' },
      { name: 'groupType', label: '그룹유형', type: 'select', options: ['OPERATOR_ORG', 'TENANT_ORG', 'FUNCTIONAL', 'SECURITY', 'EXTERNAL'] },
      { name: 'ownerScope', label: '소유범위', type: 'select', options: ['OPERATOR', 'TENANT', 'GLOBAL'] },
      { name: 'status', label: '상태', type: 'select', options: ['ACTIVE', 'INACTIVE', 'RETIRED'] },
      { name: 'defaultRole', label: '기본Role', type: 'select', options: ['SEC_ADMIN', 'AUDITOR', 'SUPPORT', 'TENANT_ADMIN'] },
      { name: 'description', label: '그룹설명', type: 'textarea' },
    ],
    fallback: [
      { groupCode: 'SEC-OPS', nameKo: '보안운영팀', nameEn: 'Security Operations', groupType: 'SECURITY', ownerScope: 'OPERATOR', status: 'ACTIVE', defaultRole: 'SEC_ADMIN', memberCount: 12, description: '보안·감사 운영 및 Break-glass 승인 권한을 가진 운영자 그룹' },
      { groupCode: 'CS-TEAM', nameKo: '고객지원팀', nameEn: 'Customer Support', groupType: 'OPERATOR_ORG', ownerScope: 'OPERATOR', status: 'ACTIVE', defaultRole: 'SUPPORT', memberCount: 28, description: '이용회사 지원 세션을 수행하는 운영자 그룹' },
    ],
    labelOf: (d) => `${d.groupCode} ${d.nameKo}`,
  });

  const visible = crud.rows.filter((r) => groupType === '전체' || r.data.groupType === groupType);
  const sel = crud.selectedRow?.data as Record<string, string> | undefined;

  return (
    <ScreenShell
      title="사용자그룹 관리"
      screenId="OP-06G"
      breadcrumb={['운영콘솔', '사용자·인증·권한', '사용자그룹 관리']}
      titleRight={<>MenuVersion v42 · PUBLISHED</>}
    >
      <div className="tabbar">
        <div className={`tab${tab === 0 ? ' on' : ''}`} onClick={() => setTab(0)}>그룹·구성원 <span className="tno">1</span></div>
        <div className={`tab${tab === 1 ? ' on' : ''}`} onClick={() => setTab(1)}>메뉴 권한 <span className="tno">2</span></div>
      </div>

      {tab === 0 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow" onClick={() => void crud.reload()}>🔍 조회</ABtn>
                <ABtn onClick={crud.openCreate}>그룹 추가</ABtn>
                <ABtn onClick={crud.openEdit}>그룹 수정</ABtn>
                <ABtn variant="red" onClick={() => void crud.handleDelete()}>그룹 삭제</ABtn>
                <ABtn variant="dark" onClick={crud.openEdit}>그룹 저장</ABtn>
              </>
            }
          >
            <QLabel>그룹 검색</QLabel>
            <QValue><input placeholder="groupCode/국문/영문" /> <span className="lens">⌕</span></QValue>
            <QLabel>그룹 유형</QLabel>
            <Seg options={['전체', 'OPERATOR_ORG', 'TENANT_ORG', 'SECURITY']} value={groupType} onChange={setGroupType} />
          </QueryBar>
          <div className="mock-flex">
            <div className="lpane">
              <div className="lp-t">그룹 트리 <span className="cnt">{visible.length}건</span></div>
              <div className="ptree">
                {visible.map((row) => {
                  const d = row.data as Record<string, string>;
                  const idx = crud.rows.indexOf(row);
                  return (
                    <div key={row.id} className={`tnode lv1${crud.selected === idx ? ' on' : ''}`} onClick={() => crud.setSelected(idx)}>
                      ▸ {d.nameKo} <span className="cnt">{String(row.data.memberCount ?? 0)}명 · {d.groupType}</span>
                    </div>
                  );
                })}
                {visible.length === 0 && <div className="tnode dim">그룹이 없습니다</div>}
              </div>
            </div>
            <div className="mock-main">
              <div className="formgrid c3 label-left">
                <div className="ff"><label>그룹코드</label><div className="fv ro">{sel?.groupCode ?? '-'}</div></div>
                <div className="ff"><label>국문명</label><div className="fv ro">{sel?.nameKo ?? '-'}</div></div>
                <div className="ff"><label>영문명</label><div className="fv ro">{sel?.nameEn ?? '-'}</div></div>
                <div className="ff"><label>그룹유형</label><div className="fv ro">{sel?.groupType ?? '-'}</div></div>
                <div className="ff"><label>소유범위</label><div className="fv ro">{sel?.ownerScope ?? '-'}</div></div>
                <div className="ff"><label>상태</label><div className="fv ro">{sel?.status ?? '-'}</div></div>
                <div className="ff"><label>기본Role</label><div className="fv ro">{sel?.defaultRole ?? '-'}</div></div>
                <div className="ff"><label>유효기간</label><div className="fv ro">2026-01-01 ~ 9999-12-31</div></div>
                <div className="ff full"><label>그룹설명</label><div className="fv ro">{sel?.description ?? '-'}</div></div>
              </div>
              <div className="gridwrap">
                <table className="grid">
                  <thead>
                    <tr><th className="c">선택</th><th>구성원</th><th>Login ID</th><th>사용자구분</th><th>상속 Role</th><th>메뉴 정책</th><th>시작일</th><th>만료</th><th className="c">상태</th></tr>
                  </thead>
                  <tbody>
                    {groupMemberRows.map((m) => (
                      <tr key={m.loginId} className={m.sel ? 'sel' : ''}>
                        <td className="c">{m.sel ? '✓' : '□'}</td>
                        <td>{m.name}</td>
                        <td>{m.loginId}</td>
                        <td>{m.type}</td>
                        <td>{m.role}</td>
                        <td>{m.policy}</td>
                        <td>{m.start}</td>
                        <td>{m.end}</td>
                        <td className="c"><span className={`badge ${m.tone}`}>{m.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar message="✓ 그룹 CRUD와 구성원 CRUD를 별도 저장 단위로 분리 · 그룹 변경은 감사로그 기록" count={`UserGroup ${visible.length}건`} />
            </div>
            <RightPanel>
              <InfoBox title="그룹 저장 검증"><KV k="groupCode" v="UNIQUE" /><KV k="상위그룹" v="순환 없음" /><KV k="Role" v={sel?.defaultRole ?? '-'} /></InfoBox>
              <InfoBox title="구성원 저장 검증"><KV k="범위" v="OPERATOR 일치" /><KV k="중복" v="0건" /><KV k="만료예정" v="1명" /></InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          <QueryBar
            actions={
              <>
                <ABtn variant="yellow">🔍 조회</ABtn>
                <ABtn>추가</ABtn>
                <ABtn>수정</ABtn>
                <ABtn variant="red">삭제</ABtn>
                <ABtn variant="dark">저장</ABtn>
                <ABtn>영향 분석</ABtn>
              </>
            }
          >
            <QLabel>그룹</QLabel>
            <QValue>{sel?.nameKo ?? '보안운영팀'} <span className="lens">▾</span></QValue>
            <QLabel>메뉴코드</QLabel>
            <QValue><input placeholder="OP-06/OP-10" /> <span className="lens">⌕</span></QValue>
            <QLabel>정책</QLabel>
            <Seg options={['INHERIT', 'ALLOW', 'DENY']} value={policy} onChange={setPolicy} />
          </QueryBar>
          <div className="mock-flex">
            <div className="lpane">
              <div className="lp-t">MenuVersion v42</div>
              <div className="ptree">
                <div className="tnode lv1 on">▸ OP 운영콘솔</div>
                <div className="tnode lv2">OP-06 사용자·권한 <span className="cnt">ALLOW</span></div>
                <div className="tnode lv3">OP-06D 메뉴 마스터 <span className="cnt">ALLOW</span></div>
                <div className="tnode lv2 red">OP-08 기장 워크벤치 <span className="cnt">DENY</span></div>
                <div className="tnode lv2">OP-10 로그 관리 <span className="cnt">ALLOW</span></div>
                <div className="tnode lv2">OP-12 개인정보보호 <span className="cnt">ALLOW</span></div>
              </div>
            </div>
            <div className="mock-main">
              <div className="gridwrap">
                <table className="grid">
                  <thead><tr><th>메뉴</th><th>Role 권한</th><th>그룹 정책</th><th>최종 노출</th><th>진입</th><th>사유</th></tr></thead>
                  <tbody>
                    {groupMenuPolicyRows.map((r, i) => (
                      <tr key={r.menu} className={i === 0 ? 'sel' : ''}>
                        <td>{r.menu}</td>
                        <td>{r.rolePerm}</td>
                        <td><span className={`badge ${r.tone}`}>{r.policy}</span></td>
                        <td>{r.visible}</td>
                        <td>{r.enter}</td>
                        <td>{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StatusBar tone="warn" message="DENY 우선 — 같은 사용자의 다른 그룹 ALLOW가 있어도 OP-08은 미노출" count="영향 사용자 12명" />
            </div>
            <RightPanel>
              <InfoBox title="충돌 검증"><span className="badge b-warn">USER_GROUP_MENU_CONFLICT</span><br />ALLOW 1건 · DENY 1건 → DENY 우선 기록</InfoBox>
              <InfoBox title="API"><code>PUT /api/operator/user-groups/{'{groupId}'}/menu-permissions</code></InfoBox>
            </RightPanel>
          </div>
        </>
      )}

      {crud.dialog}
      <ScreenDetails
        items={[
          { label: '목적', body: '사용자그룹 자체의 생성·수정·삭제와 그룹 구성원 추가·삭제를 분리해 관리하고, Role 상속과 메뉴 노출 정책을 통제한다.' },
          { label: '입력 필드', body: '그룹: groupCode, groupNameKo/En, groupType, ownerScope, parentGroup, defaultRole, status, 유효기간. 구성원: userId/loginId, userType, inheritedRole, dataScope, 시작일, 만료일, memberStatus.' },
          { label: '기능', body: '그룹 추가·수정·삭제·저장, 구성원 조회·추가·수정·삭제·저장, 구성원 일괄 추가, Role 바인딩, 메뉴 INHERIT/ALLOW/DENY 설정.' },
          { label: '검증', body: '그룹코드 중복, 상위그룹 순환참조, 구성원 범위, 구성원 중복, 만료일, 메뉴 버전, 부모 메뉴 DENY, 다중 그룹 충돌.' },
          { label: '산출물', body: 'UserGroup, UserGroupHierarchy, UserGroupMember, UserGroupRoleBinding, UserGroupMenuPermission.' },
          { label: '연계', body: '/api/me/menus bootstrap, PermissionEvaluationCache, RoleMenuPermission, UserAuditLog.' },
        ]}
      />
    </ScreenShell>
  );
}
