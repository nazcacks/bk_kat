import type { DialogField, DialogValues } from './EditDialog';
import { ABtn } from './QueryBar';

interface EditableFormProps {
  fields: DialogField[];
  /** 표시/편집 값 */
  values: DialogValues;
  /** null = 조회(읽기전용), 'create'/'edit' = 편집 모드 */
  mode: 'create' | 'edit' | null;
  onChange: (name: string, value: unknown) => void;
  onSave?: () => void;
  onCancel?: () => void;
  error?: string | null;
  saving?: boolean;
  columns?: 2 | 3;
}

/**
 * 화면 내 직접 편집 폼 (팝업 없이 CRUD).
 * 조회 모드에서는 읽기전용 값, 편집 모드에서는 입력 컨트롤을 렌더링한다.
 */
export default function EditableForm({
  fields, values, mode, onChange, onSave, onCancel, error, saving, columns = 3,
}: EditableFormProps) {
  const editing = mode !== null;

  return (
    <div className={editing ? 'inline-editing' : undefined}>
      {editing && (
        <div className="qbar inline-edit-bar">
          <span className={`badge ${mode === 'create' ? 'b-new' : 'b-warn'}`}>
            {mode === 'create' ? '신규 등록 중' : '수정 중'}
          </span>
          <span className="qlabel">아래 항목을 입력한 뒤 [저장] 하세요. 코드류 항목은 수정 시 변경할 수 없습니다.</span>
          <span className="qright">
            <ABtn variant="dark" onClick={onSave}>{saving ? '저장 중…' : '저장'}</ABtn>
            <ABtn onClick={onCancel}>취소</ABtn>
          </span>
        </div>
      )}
      <div className={`formgrid c${columns} label-left`}>
        {fields.map((f) => {
          const value = values[f.name];
          const disabled = f.readOnly || (mode === 'edit' && f.readOnlyOnEdit);
          if (!editing || f.readOnly) {
            return (
              <div className={`ff${f.type === 'textarea' ? ' full' : ''}`} key={f.name}>
                <label>{f.label}</label>
                <div className="fv ro">
                  {f.type === 'checkbox' ? (value ? '예' : '아니오') : String(value ?? '') || '-'}
                </div>
              </div>
            );
          }
          return (
            <div className={`ff${f.type === 'textarea' ? ' full' : ''}`} key={f.name}>
              <label>{f.label}{f.required ? ' *' : ''}</label>
              {f.type === 'select' ? (
                <select className="fv" value={String(value ?? '')} disabled={disabled} onChange={(e) => onChange(f.name, e.target.value)}>
                  {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <div className="fv" style={{ cursor: disabled ? 'default' : 'pointer' }} onClick={() => !disabled && onChange(f.name, !value)}>
                  <input type="checkbox" checked={!!value} disabled={disabled} readOnly /> {value ? '예' : '아니오'}
                </div>
              ) : f.type === 'textarea' ? (
                <textarea className="fv" rows={2} value={String(value ?? '')} disabled={disabled} onChange={(e) => onChange(f.name, e.target.value)} />
              ) : (
                <input
                  className={`fv${disabled ? ' ro' : ''}`}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(value ?? '')}
                  placeholder={f.placeholder}
                  disabled={disabled}
                  onChange={(e) => onChange(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
      {error && (
        <div style={{ color: 'var(--ey-red)', fontSize: 14, fontWeight: 600, padding: '4px 12px 10px' }}>⚠ {error}</div>
      )}
    </div>
  );
}
