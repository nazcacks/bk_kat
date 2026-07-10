import { apiDelete, apiGet, apiPost, apiPut } from './client';
import { mockMenuTree } from './mock/menus';
import { mockFlatMenus } from './mock/users';
import type { FlatMenu, MenuNode } from '../types';

export async function fetchMenuTree(): Promise<MenuNode[]> {
  try {
    return await apiGet<MenuNode[]>('/menus/tree');
  } catch (e) {
    console.warn('[menus] /menus/tree 실패 — mock 메뉴로 폴백합니다.', e);
    return mockMenuTree;
  }
}

export async function fetchFlatMenus(): Promise<FlatMenu[]> {
  try {
    return await apiGet<FlatMenu[]>('/menus');
  } catch (e) {
    console.warn('[menus] /menus 실패 — mock 메뉴로 폴백합니다.', e);
    return mockFlatMenus;
  }
}

// ── CRUD (백엔드 필수 — 실패 시 오류 전파) ──────────────────────
export function createMenu(data: Partial<FlatMenu>): Promise<FlatMenu> {
  return apiPost('/menus', data);
}

export function updateMenu(id: string, data: Partial<FlatMenu>): Promise<FlatMenu> {
  return apiPut(`/menus/${id}`, data);
}

export function deleteMenu(id: string): Promise<{ id: string; deleted: boolean }> {
  return apiDelete(`/menus/${id}`);
}
