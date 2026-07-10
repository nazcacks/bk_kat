import { apiDelete, apiGet, apiPost, apiPut } from './client';
import { mockCommonCodes } from './mock/codes';
import type { CommonCodeGroup, CommonCodeItem } from '../types';

export async function fetchCommonCodes(): Promise<CommonCodeGroup[]> {
  try {
    return await apiGet<CommonCodeGroup[]>('/common-codes');
  } catch (e) {
    console.warn('[codes] /common-codes 실패 — mock으로 폴백합니다.', e);
    return mockCommonCodes;
  }
}

// ── CRUD (백엔드 필수 — 실패 시 오류 전파) ──────────────────────
export function createCodeGroup(data: { groupCode: string; groupName: string; description?: string }) {
  return apiPost<CommonCodeGroup>('/common-codes/groups', data);
}

export function updateCodeGroup(groupCode: string, data: { groupName?: string; description?: string }) {
  return apiPut<CommonCodeGroup>(`/common-codes/groups/${groupCode}`, data);
}

export function deleteCodeGroup(groupCode: string) {
  return apiDelete<{ groupCode: string; deleted: boolean }>(`/common-codes/groups/${groupCode}`);
}

export function createCodeItem(groupCode: string, data: { code: string; name: string; sortOrder?: number }) {
  return apiPost<CommonCodeItem>(`/common-codes/${groupCode}/items`, data);
}

export function updateCodeItem(groupCode: string, code: string, data: { name?: string; sortOrder?: number; isActive?: boolean }) {
  return apiPut<CommonCodeItem>(`/common-codes/${groupCode}/items/${code}`, data);
}

export function deleteCodeItem(groupCode: string, code: string) {
  return apiDelete<{ code: string; deleted: boolean }>(`/common-codes/${groupCode}/items/${code}`);
}
