import type { ReactNode } from 'react';

/** 설계 HTML .rpanel 재현 — 우측 260px 안내 패널 */
export default function RightPanel({ children }: { children: ReactNode }) {
  return <aside className="rpanel">{children}</aside>;
}
