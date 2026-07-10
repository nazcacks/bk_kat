import { apiGet, apiPost } from './client';
import { mockLogin, mockUser } from './mock/auth';
import type { LoginResult, User } from '../types';

export async function login(loginId: string, password: string): Promise<LoginResult> {
  try {
    return await apiPost<LoginResult>('/auth/login', { loginId, password });
  } catch (e) {
    console.warn('[auth] 백엔드 로그인 실패 — mock 사용자로 폴백합니다.', e);
    return mockLogin(loginId);
  }
}

export async function fetchMe(): Promise<User> {
  try {
    return await apiGet<User>('/auth/me');
  } catch (e) {
    console.warn('[auth] /auth/me 실패 — mock 사용자로 폴백합니다.', e);
    return mockUser;
  }
}
