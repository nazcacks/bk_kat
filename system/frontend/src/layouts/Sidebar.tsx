import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { findMenuByPath, useMenuStore } from '../stores/menuStore';
import type { MenuNode } from '../types';

const CHANNELS = [
  { code: 'OP', label: '운영콘솔' },
  { code: 'TN', label: '업무화면' },
  { code: 'CO', label: '공통' },
] as const;

type ChannelCode = (typeof CHANNELS)[number]['code'];

function channelFromPath(pathname: string): ChannelCode {
  if (pathname.startsWith('/operator')) return 'OP';
  if (pathname.startsWith('/common')) return 'CO';
  return 'TN'; // /tenant*, /dashboard 등
}

/** 필터 문자열에 매칭되는 노드(또는 매칭 자손을 가진 노드)만 남긴 트리 반환 */
function filterTree(nodes: MenuNode[], query: string): MenuNode[] {
  const q = query.trim().toLowerCase();
  if (!q) return nodes;
  const result: MenuNode[] = [];
  for (const node of nodes) {
    const selfMatch =
      node.name.toLowerCase().includes(q) ||
      (node.nameEn ?? '').toLowerCase().includes(q) ||
      (node.screenId ?? '').toLowerCase().includes(q) ||
      node.menuCode.toLowerCase().includes(q);
    const children = filterTree(node.children ?? [], q);
    if (selfMatch || children.length > 0) {
      result.push({ ...node, children: selfMatch && children.length === 0 ? node.children : children });
    }
  }
  return result;
}

export default function Sidebar() {
  const location = useLocation();
  const tree = useMenuStore((s) => s.tree);
  const expandedGroups = useMenuStore((s) => s.expandedGroups);
  const toggleGroup = useMenuStore((s) => s.toggleGroup);
  const expandGroups = useMenuStore((s) => s.expandGroups);

  const [channel, setChannel] = useState<ChannelCode>(() => channelFromPath(location.pathname));
  const [filter, setFilter] = useState('');

  // 경로 이동 시: 채널 자동 전환 + 활성 경로 조상 그룹 펼침
  useEffect(() => {
    const { trail } = findMenuByPath(tree, location.pathname);
    if (trail.length > 0) {
      const root = trail[0];
      if (root.channel === 'OP' || root.channel === 'TN' || root.channel === 'CO') {
        setChannel(root.channel);
      }
      expandGroups(trail.filter((n) => n.menuType === 'GROUP').map((n) => n.menuCode));
    } else {
      setChannel(channelFromPath(location.pathname));
    }
  }, [location.pathname, tree, expandGroups]);

  const channelRoot = tree.find((n) => n.menuCode === channel || n.channel === channel);
  const filtering = filter.trim().length > 0;

  const visibleNodes = useMemo(
    () => filterTree(channelRoot?.children ?? [], filter),
    [channelRoot, filter],
  );

  const renderNodes = (nodes: MenuNode[], depth: number) =>
    nodes.map((node) => {
      if (node.menuType === 'GROUP') {
        const expanded = filtering || !!expandedGroups[node.menuCode];
        const isArea = depth === 0; // 업무영역 GROUP
        return (
          <div key={node.menuCode} className={isArea ? 'sb-group' : 'sb-subgroup'}>
            <button
              className={isArea ? 'sb-group-title' : 'sb-subgroup-title'}
              style={isArea ? undefined : { paddingLeft: 16 + depth * 12 }}
              onClick={() => toggleGroup(node.menuCode)}
            >
              {isArea && <span className="bar" />}
              <span className="gname">{node.name}</span>
              {node.requiresStepUp && <span className="lock">🔒</span>}
              <span className="chev">{expanded ? '▾' : '▸'}</span>
            </button>
            {expanded && renderNodes(node.children ?? [], depth + 1)}
          </div>
        );
      }
      return (
        <NavLink
          key={node.menuCode}
          to={node.path ?? '#'}
          className={({ isActive }) => `menu-item${isActive ? ' active' : ''}`}
          style={{ paddingLeft: 22 + depth * 12 }}
        >
          <span className="mname">{node.name}</span>
          {node.requiresStepUp && <span className="lock">🔒</span>}
          {node.screenId && <span className="screen-id">{node.screenId}</span>}
        </NavLink>
      );
    });

  return (
    <nav className="sidebar">
      <div className="channel-tabs">
        {CHANNELS.map((c) => (
          <button
            key={c.code}
            className={`channel-tab${channel === c.code ? ' on' : ''}`}
            onClick={() => setChannel(c.code)}
          >
            {c.label}
            <span className="ch-code">{c.code}</span>
          </button>
        ))}
      </div>
      <div className="menu-filter">
        <input
          type="text"
          value={filter}
          placeholder="🔍 메뉴명 / 화면ID 필터"
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter && (
          <button className="clear" onClick={() => setFilter('')} aria-label="필터 지우기">
            ✕
          </button>
        )}
      </div>
      <div className="sb-scroll">
        {visibleNodes.length === 0 ? (
          <div className="sb-empty">일치하는 메뉴가 없습니다.</div>
        ) : (
          renderNodes(visibleNodes, 0)
        )}
      </div>
    </nav>
  );
}
