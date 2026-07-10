import { create } from 'zustand';
import { fetchMenuTree } from '../api/menus';
import { mockMenuTree } from '../api/mock/menus';
import type { MenuNode } from '../types';

interface MenuState {
  tree: MenuNode[];
  loaded: boolean;
  /** 그룹 펼침 상태 — 기본 접힘(undefined/false = 접힘) */
  expandedGroups: Record<string, boolean>;
  loadMenus: () => Promise<void>;
  toggleGroup: (menuCode: string) => void;
  /** 여러 그룹을 한 번에 펼침 (활성 경로 조상 자동 펼침용) */
  expandGroups: (menuCodes: string[]) => void;
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  tree: mockMenuTree,
  loaded: false,
  expandedGroups: {},
  loadMenus: async () => {
    if (get().loaded) return;
    const tree = await fetchMenuTree();
    set({ tree, loaded: true });
  },
  toggleGroup: (menuCode) =>
    set((s) => ({
      expandedGroups: {
        ...s.expandedGroups,
        [menuCode]: !s.expandedGroups[menuCode],
      },
    })),
  expandGroups: (menuCodes) =>
    set((s) => {
      const next = { ...s.expandedGroups };
      let changed = false;
      for (const code of menuCodes) {
        if (!next[code]) {
          next[code] = true;
          changed = true;
        }
      }
      return changed ? { expandedGroups: next } : s;
    }),
}));

/**
 * 경로로 메뉴 찾기 (다단 트리 재귀) — trail 은 루트부터 해당 메뉴까지의 노드 배열.
 * group 은 직계 상위 GROUP (breadcrumb 호환용).
 */
export function findMenuByPath(
  tree: MenuNode[],
  path: string,
): { menu?: MenuNode; group?: MenuNode; trail: MenuNode[] } {
  const walk = (nodes: MenuNode[], trail: MenuNode[]): { menu: MenuNode; trail: MenuNode[] } | null => {
    for (const node of nodes) {
      const nextTrail = [...trail, node];
      if (node.path === path) return { menu: node, trail: nextTrail };
      const found = walk(node.children ?? [], nextTrail);
      if (found) return found;
    }
    return null;
  };
  const found = walk(tree, []);
  if (!found) return { trail: [] };
  const group = found.trail.length >= 2 ? found.trail[found.trail.length - 2] : undefined;
  return { menu: found.menu, group, trail: found.trail };
}

/** 트리를 평면 배열로 flatten (재귀) — 라우팅/메뉴 마스터용 */
export function flattenMenuTree(tree: MenuNode[]): MenuNode[] {
  const out: MenuNode[] = [];
  const walk = (nodes: MenuNode[]) => {
    for (const node of nodes) {
      out.push(node);
      if (node.children?.length) walk(node.children);
    }
  };
  walk(tree);
  return out;
}
