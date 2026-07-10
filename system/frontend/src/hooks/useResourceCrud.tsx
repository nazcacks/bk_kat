import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DialogField, DialogValues } from '../components/frame/EditDialog';
import EditableForm from '../components/frame/EditableForm';
import {
  createResource,
  deleteResource,
  listResources,
  updateResource,
  type ResourceRow,
} from '../api/resources';

interface UseResourceCrudOptions {
  /** 리소스 유형 (backend /api/resources/:type) */
  type: string;
  /** 리소스 명칭 (확인 문구용, 예: '테넌트') */
  title: string;
  /** 폼 필드 정의 */
  fields: DialogField[];
  /** 백엔드 미기동 시 목록 폴백 데이터 */
  fallback?: Record<string, unknown>[];
  /** 행 표시용 라벨 (삭제 확인 문구에 사용) */
  labelOf?: (data: Record<string, unknown>) => string;
  /** 폼 컬럼 수 */
  columns?: 2 | 3;
}

/**
 * 운영 리소스 공통 CRUD 훅 — 팝업 없이 화면 내 직접 편집.
 * [추가]/[수정] → 폼이 편집 모드로 전환, [저장] → 커밋, [취소]/행 선택 → 편집 종료.
 * 모든 변경은 백엔드 감사로그(해시체인)에 자동 기록된다.
 */
export function useResourceCrud({ type, title, fields, fallback = [], labelOf, columns = 3 }: UseResourceCrudOptions) {
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [selected, setSelectedRaw] = useState(0);
  const [editing, setEditing] = useState<'create' | 'edit' | null>(null);
  const [draft, setDraft] = useState<DialogValues>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    const list = await listResources(type, fallback);
    setRows(list);
    setSelectedRaw((s) => Math.min(s, Math.max(list.length - 1, 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const selectedRow = rows[selected];

  const emptyValues = useMemo(() => {
    const v: DialogValues = {};
    fields.forEach((f) => {
      v[f.name] = f.type === 'checkbox' ? false : f.type === 'select' ? (f.options?.[0] ?? '') : '';
    });
    return v;
  }, [fields]);

  /** 행 선택 시 편집 중이면 편집 종료 */
  const setSelected = (idx: number) => {
    setSelectedRaw(idx);
    setEditing(null);
    setError(null);
  };

  const openCreate = () => {
    setDraft(emptyValues);
    setEditing('create');
    setError(null);
  };

  const openEdit = () => {
    if (!selectedRow) return window.alert('수정할 행을 먼저 선택하세요.');
    setDraft({ ...emptyValues, ...selectedRow.data });
    setEditing('edit');
    setError(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setError(null);
  };

  const setField = (name: string, value: unknown) => setDraft((prev) => ({ ...prev, [name]: value }));

  const save = async () => {
    if (!editing) return window.alert('[추가] 또는 [수정] 으로 편집을 시작한 뒤 저장하세요.');
    for (const f of fields) {
      if (f.required && !String(draft[f.name] ?? '').trim()) {
        setError(`'${f.label}' 은(는) 필수 입력입니다.`);
        return;
      }
    }
    setSaving(true);
    setError(null);
    try {
      if (editing === 'create') await createResource(type, draft);
      else if (selectedRow) await updateResource(type, selectedRow.id, draft);
      setEditing(null);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : `${title} 저장에 실패했습니다. 백엔드 기동 여부를 확인하세요.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRow) return window.alert('삭제할 행을 먼저 선택하세요.');
    const label = labelOf?.(selectedRow.data) ?? selectedRow.id;
    if (!window.confirm(`'${label}' 을(를) 삭제(비활성)하시겠습니까?\n삭제 이력은 감사로그에 기록됩니다.`)) return;
    try {
      await deleteResource(type, selectedRow.id);
      setEditing(null);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다. 백엔드 기동 여부를 확인하세요.');
    }
  };

  /** 화면 내 편집 폼 — 조회 시 선택 행 표시, 편집 시 입력 컨트롤 */
  const form = (
    <EditableForm
      fields={fields}
      values={editing ? draft : ((selectedRow?.data as DialogValues) ?? {})}
      mode={editing}
      onChange={setField}
      onSave={() => void save()}
      onCancel={cancelEdit}
      error={error}
      saving={saving}
      columns={columns}
    />
  );

  return {
    rows, selected, setSelected, selectedRow, reload,
    editing, openCreate, openEdit, cancelEdit, save, handleDelete,
    form,
  };
}
