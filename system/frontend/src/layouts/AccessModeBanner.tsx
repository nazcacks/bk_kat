import { useState } from 'react';

export default function AccessModeBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="access-banner">
      <span>🔓</span>
      <span>
        <b>VIEW 모드</b> · ㈜비케이테스트 · 접근사유: 개발/테스트 · 세션 유휴만료 30분
      </span>
      <button className="close-btn" onClick={() => setVisible(false)} aria-label="배너 닫기">
        ✕
      </button>
    </div>
  );
}
