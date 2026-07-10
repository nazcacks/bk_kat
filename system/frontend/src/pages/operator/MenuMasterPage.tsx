import { useEffect, useMemo, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { fetchFlatMenus } from '../../api/menus';
import type { FlatMenu } from '../../types';

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

  useEffect(() => {
    void fetchFlatMenus().then(setMenus);
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
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>추가</ABtn>
            <ABtn>수정</ABtn>
            <ABtn variant="red">삭제</ABtn>
            <ABtn variant="dark">저장</ABtn>
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
                onClick={() => setSelectedCode(m.menuCode)}
              >
                {m.menuType === 'GROUP' ? '▸ ' : ''}{m.name}
                <span className="cnt">{m.screenId ?? m.menuCode}</span>
                {m.requiresStepUp ? ' 🔒' : ''}
              </div>
            ))}
          </div>
        </div>
        <div className="mock-main">
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
