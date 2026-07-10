import { useState } from 'react';

export interface SearchField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'daterange';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export type SearchValues = Record<string, string>;

interface SearchBarProps {
  fields: SearchField[];
  onSearch: (values: SearchValues) => void;
}

export default function SearchBar({ fields, onSearch }: SearchBarProps) {
  const [values, setValues] = useState<SearchValues>({});

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const reset = () => {
    setValues({});
    onSearch({});
  };

  return (
    <div className="search-bar">
      {fields.map((f) => (
        <div className="field" key={f.name}>
          <label>{f.label}</label>
          {f.type === 'text' && (
            <input
              type="text"
              value={values[f.name] ?? ''}
              placeholder={f.placeholder}
              onChange={(e) => set(f.name, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(values)}
            />
          )}
          {f.type === 'select' && (
            <select value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)}>
              <option value="">전체</option>
              {(f.options ?? []).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
          {f.type === 'date' && (
            <input type="date" value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
          )}
          {f.type === 'daterange' && (
            <div className="range">
              <input
                type="date"
                value={values[`${f.name}From`] ?? ''}
                onChange={(e) => set(`${f.name}From`, e.target.value)}
              />
              <span>~</span>
              <input
                type="date"
                value={values[`${f.name}To`] ?? ''}
                onChange={(e) => set(`${f.name}To`, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="buttons">
        <button className="btn btn-primary" onClick={() => onSearch(values)}>
          조회
        </button>
        <button className="btn" onClick={reset}>
          초기화
        </button>
      </div>
    </div>
  );
}
