import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

interface Envelope<T> {
  success: boolean;
  data: T;
  error: { code: string; message: string } | null;
  meta?: { requestId: string; timestamp: string };
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const envelope = response.data as Envelope<unknown>;
    if (envelope && envelope.success) {
      // envelope 해제: data만 반환
      return envelope.data as never;
    }
    return Promise.reject(
      new Error(envelope?.error?.message ?? 'API 오류가 발생했습니다.'),
    );
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// 응답 인터셉터가 envelope를 해제해 data를 직접 반환하므로 타입 헬퍼 제공
export async function apiGet<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const res = await instance.get(url, { params });
  return res as unknown as T;
}

export async function apiPost<T>(url: string, body?: unknown): Promise<T> {
  const res = await instance.post(url, body);
  return res as unknown as T;
}

export default instance;
