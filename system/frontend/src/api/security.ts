import { apiGet } from './client';
import {
  mockAuditLogs,
  mockLoginHistories,
  mockMaskingPolicies,
  mockPrivacyLogs,
} from './mock/security';
import type { AuditLog, LoginHistory, MaskingPolicy, Paged, PrivacyAccessLog } from '../types';

export async function fetchAuditLogs(page: number, size: number): Promise<Paged<AuditLog>> {
  try {
    return await apiGet<Paged<AuditLog>>('/security/audit-logs', { page, size });
  } catch (e) {
    console.warn('[security] audit-logs 실패 — mock으로 폴백합니다.', e);
    return mockAuditLogs(page, size);
  }
}

export async function fetchPrivacyAccessLogs(page: number, size: number): Promise<Paged<PrivacyAccessLog>> {
  try {
    return await apiGet<Paged<PrivacyAccessLog>>('/security/privacy-access-logs', { page, size });
  } catch (e) {
    console.warn('[security] privacy-access-logs 실패 — mock으로 폴백합니다.', e);
    return mockPrivacyLogs(page, size);
  }
}

export async function fetchLoginHistories(page: number, size: number): Promise<Paged<LoginHistory>> {
  try {
    return await apiGet<Paged<LoginHistory>>('/security/login-histories', { page, size });
  } catch (e) {
    console.warn('[security] login-histories 실패 — mock으로 폴백합니다.', e);
    return mockLoginHistories(page, size);
  }
}

export async function fetchMaskingPolicies(): Promise<MaskingPolicy[]> {
  try {
    return await apiGet<MaskingPolicy[]>('/security/masking-policies');
  } catch (e) {
    console.warn('[security] masking-policies 실패 — mock으로 폴백합니다.', e);
    return mockMaskingPolicies;
  }
}
