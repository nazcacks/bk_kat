import type { ReactNode } from 'react';

interface StatusBarProps {
  /** 좌측 메시지 */
  message?: ReactNode;
  /** 메시지 톤 — ok(초록) / warn(노랑) */
  tone?: 'ok' | 'warn';
  /** 우측 카운트/부가 텍스트 */
  count?: ReactNode;
}

/** 설계 HTML .statusbar 재현 — 하단 다크 상태바 */
export default function StatusBar({ message, tone = 'ok', count }: StatusBarProps) {
  return (
    <div className="statusbar">
      {message && <span className={tone === 'ok' ? 'okmsg' : 'warnmsg'}>{message}</span>}
      {count && <span className="cnt">{count}</span>}
    </div>
  );
}
