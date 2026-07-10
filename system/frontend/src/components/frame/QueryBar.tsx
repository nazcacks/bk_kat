import type { ReactNode } from 'react';

/** 설계 HTML .qbar 재현 — 라벨+값 조회조건 + 우측 액션버튼 영역 */
export default function QueryBar({ children, actions }: { children?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="qbar">
      {children}
      {actions && <span className="qright">{actions}</span>}
    </div>
  );
}

/** 조회조건 라벨 */
export function QLabel({ children }: { children: ReactNode }) {
  return <span className="qlabel">{children}</span>;
}

/** 조회조건 값 박스 (텍스트/입력/선택 어떤 것이든 감쌈) */
export function QValue({ children, off }: { children: ReactNode; off?: boolean }) {
  return <span className={`qv${off ? ' off' : ''}`}>{children}</span>;
}

interface SegProps {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
}

/** 세그먼트 토글 (.seg) */
export function Seg({ options, value, onChange }: SegProps) {
  return (
    <span className="seg">
      {options.map((opt) => (
        <span
          key={opt}
          className={opt === value ? 'on' : ''}
          onClick={() => onChange?.(opt)}
          role="button"
        >
          {opt}
        </span>
      ))}
    </span>
  );
}

export type ABtnVariant = 'yellow' | 'ghost' | 'red' | 'dark';

interface ABtnProps {
  variant?: ABtnVariant;
  small?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

/** 액션 버튼 (.abtn) — yellow(조회) / ghost(추가·수정) / red(삭제) / dark(저장·발행) */
export function ABtn({ variant = 'ghost', small, onClick, children }: ABtnProps) {
  return (
    <button className={`abtn ${variant}${small ? ' sm' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
