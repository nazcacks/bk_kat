import { apiGet } from './client';
import { mockDashboardSummary } from './mock/dashboard';
import type { DashboardSummary } from '../types';

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  try {
    return await apiGet<DashboardSummary>('/dashboard/summary');
  } catch (e) {
    console.warn('[dashboard] /dashboard/summary 실패 — mock으로 폴백합니다.', e);
    return mockDashboardSummary;
  }
}
