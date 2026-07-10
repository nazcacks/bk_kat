import { apiDelete, apiGet, apiPost, apiPut } from './client';
import { mockRoles, mockUsers } from './mock/users';
import type { ManagedUser, Paged, RoleSummary } from '../types';

export async function fetchUsers(page: number, size: number): Promise<Paged<ManagedUser>> {
  try {
    return await apiGet<Paged<ManagedUser>>('/users', { page, size });
  } catch (e) {
    console.warn('[users] /users 실패 — mock으로 폴백합니다.', e);
    return mockUsers(page, size);
  }
}

export async function fetchRoles(): Promise<RoleSummary[]> {
  // 역할 요약은 현재 백엔드 미구현 — mock 데이터 사용
  return Promise.resolve(mockRoles);
}

// ── CRUD (백엔드 필수 — 실패 시 오류 전파) ──────────────────────
export function createUser(data: Partial<ManagedUser>): Promise<ManagedUser> {
  return apiPost('/users', data);
}

export function updateUser(id: string, data: Partial<ManagedUser>): Promise<ManagedUser> {
  return apiPut(`/users/${id}`, data);
}

/** 삭제 = DISABLED 처리 (물리 삭제 금지) */
export function disableUser(id: string): Promise<{ id: string; status: string }> {
  return apiDelete(`/users/${id}`);
}
