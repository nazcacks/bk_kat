import { useState } from 'react';

export interface ScreenDetailItem {
  label: string;
  body: string;
}

/** 설계 HTML .screen-details 재현 — 접을 수 있는 '화면 설계 정보' 패널 */
export default function ScreenDetails({ items }: { items: ScreenDetailItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="screen-details">
      <button className="sd-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? '▾' : '▸'} 화면 설계 정보
      </button>
      {open && (
        <div className="screen-desc-list">
          {items.map((item) => (
            <div className="screen-desc-item" key={item.label}>
              <span className="desc-label">{item.label}</span>
              <span className="desc-body">{item.body}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
