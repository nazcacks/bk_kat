import type { ReactNode } from 'react';

/** 설계 HTML .rp-box 재현 — 타이틀 + 본문 안내 박스 */
export default function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rp-box">
      <div className="rp-t">{title}</div>
      <div className="rp-b">{children}</div>
    </div>
  );
}

/** rp-box 안 key-value 행 */
export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="kv">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  );
}
