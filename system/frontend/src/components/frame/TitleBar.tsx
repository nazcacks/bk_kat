import type { ReactNode } from 'react';

interface TitleBarProps {
  /** 좌측 회색 crumb 텍스트 (예: '운영 콘솔') */
  crumb: string;
  /** 화면명 (볼드) */
  title: string;
  /** 화면ID 칩 (예: 'OP-01') */
  screenId: string;
  /** 우측 상태 텍스트 슬롯 */
  right?: ReactNode;
}

/** 설계 HTML .titlebar 재현 — EY 다크 타이틀바 */
export default function TitleBar({ crumb, title, screenId, right }: TitleBarProps) {
  return (
    <div className="titlebar">
      <span className="tb-crumb">{crumb}</span>
      <span className="tb-sep">›</span>
      <span className="tb-title">{title}</span>
      <span className="tb-star">☆</span>
      <span className="tb-id">{screenId}</span>
      {right && <span className="tb-right">{right}</span>}
    </div>
  );
}
