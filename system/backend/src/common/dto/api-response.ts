/** 표준 API 응답 봉투 (설계서 CO-03 API 공통 계약) */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string; details?: unknown } | null;
  meta: { requestId?: string; timestamp: string };
}

export function ok<T>(data: T, requestId?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null,
    meta: { requestId, timestamp: new Date().toISOString() },
  };
}

export function fail(
  code: string,
  message: string,
  details?: unknown,
  requestId?: string,
): ApiResponse<null> {
  return {
    success: false,
    data: null,
    error: { code, message, details },
    meta: { requestId, timestamp: new Date().toISOString() },
  };
}
