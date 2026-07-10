import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { ABtn } from './QueryBar';

export interface DialogField {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  options?: string[];
  required?: boolean;
  /** 수정 시 변경 불가 필드 (코드류) */
  readOnlyOnEdit?: boolean;
  /** 항상 읽기전용 (시스템 부여 값 표시용) */
  readOnly?: boolean;
  placeholder?: string;
}

export type DialogValues = Record<string, unknown>;

interface EditDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  title: string;
  fields: DialogField[];
  initial: DialogValues;
  onClose: () => void;
  onSubmit: (values: DialogValues) => Promise<void> | void;
}

/** 공통 CRUD 입력 다이얼로그 — 필드 정의만으로 등록/수정 폼 생성 */
export default function EditDialog({ open, mode, title, fields, initial, onClose, onSubmit }: EditDialogProps) {
  const [values, setValues] = useState<DialogValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues(initial);
      setError(null);
    }
  }, [open, initial]);

  if (!open) return null;

  const set = (name: string, v: unknown) => setValues((prev) => ({ ...prev, [name]: v }));

  const handleSubmit = async () => {
    for (const f of fields) {
      if (f.required && !String(values[f.name] ?? '').trim()) {
        setError(`'${f.label}' 은(는) 필수 입력입니다.`);
        return;
      }
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title={`${title} ${mode === 'create' ? '등록' : '수정'}`} onClose={onClose}>
      <div className="formgrid c2 label-left" style={{ padding: 0, maxHeight: '62vh', overflowY: 'auto' }}>
        {fields.map((f) => {
          const disabled = mode === 'edit' && f.readOnlyOnEdit;
          const value = values[f.name];
          return (
            <div className={`ff${f.type === 'textarea' ? ' full' : ''}`} key={f.name}>
              <label>{f.label}{f.required ? ' *' : ''}</label>
              {f.type === 'select' ? (
                <select
                  className="fv"
                  value={String(value ?? '')}
                  disabled={disabled}
                  onChange={(e) => set(f.name, e.target.value)}
                >
                  {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <div className="fv" style={{ cursor: 'pointer' }} onClick={() => !disabled && set(f.name, !value)}>
                  <input type="checkbox" checked={!!value} disabled={disabled} readOnly /> {value ? '예' : '아니오'}
                </div>
              ) : f.type === 'textarea' ? (
                <textarea
                  className="fv"
                  rows={2}
                  value={String(value ?? '')}
                  disabled={disabled}
                  onChange={(e) => set(f.name, e.target.value)}
                />
              ) : (
                <input
                  className={`fv${disabled ? ' ro' : ''}`}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(value ?? '')}
                  placeholder={f.placeholder}
                  disabled={disabled}
                  onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
      {error && (
        <div style={{ color: 'var(--ey-red)', fontSize: 12, fontWeight: 600, marginTop: 10 }}>⚠ {error}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 14 }}>
        <ABtn onClick={onClose}>취소</ABtn>
        <ABtn variant="dark" onClick={handleSubmit}>{saving ? '저장 중…' : '저장'}</ABtn>
      </div>
    </Modal>
  );
}
