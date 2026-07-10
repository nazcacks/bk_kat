import { apiGet } from './client';
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
