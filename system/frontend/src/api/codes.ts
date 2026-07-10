import { apiGet } from './client';
import { mockCommonCodes } from './mock/codes';
import type { CommonCodeGroup } from '../types';

export async function fetchCommonCodes(): Promise<CommonCodeGroup[]> {
  try {
    return await apiGet<CommonCodeGroup[]>('/common-codes');
  } catch (e) {
    console.warn('[codes] /common-codes 실패 — mock으로 폴백합니다.', e);
    return mockCommonCodes;
  }
}
