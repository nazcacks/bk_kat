import { apiDelete, apiGet, apiPost, apiPut } from './client';

/** 운영 콘솔 공통 리소스 (backend admin_resource) */
export interface ResourceRow<T = Record<string, unknown>> {
  id: string;
  resourceType: string;
  data: T;
  createdAt?: string;
  updatedAt?: string;
}

export async function listResources<T = Record<string, unknown>>(
  type: string,
  fallback: T[] = [],
): Promise<ResourceRow<T>[]> {
  try {
    return await apiGet<ResourceRow<T>[]>(`/resources/${type}`);
  } catch (e) {
    console.warn(`[resources] ${type} 목록 실패 — mock으로 폴백합니다.`, e);
    return fallback.map((data, i) => ({ id: `mock-${i + 1}`, resourceType: type, data }));
  }
}

export function createResource<T = Record<string, unknown>>(type: string, data: T): Promise<ResourceRow<T>> {
  return apiPost(`/resources/${type}`, data);
}

export function updateResource<T = Record<string, unknown>>(
  type: string,
  id: string,
  data: Partial<T>,
): Promise<ResourceRow<T>> {
  return apiPut(`/resources/${type}/${id}`, data);
}

export function deleteResource(type: string, id: string): Promise<{ id: string; deleted: boolean }> {
  return apiDelete(`/resources/${type}/${id}`);
}
