import { useCallback, useEffect, useMemo, useState } from 'react';
import EditDialog, { type DialogField, type DialogValues } from '../components/frame/EditDialog';
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
  /** 다이얼로그 타이틀 (예: '테넌트') */
  title: string;
  /** 등록/수정 폼 필드 정의 */
  fields: DialogField[];
  /** 백엔드 미기동 시 목록 폴백 데이터 */
  fallback?: Record<string, unknown>[];
  /** 행 표시용 라벨 (삭제 확인 문구에 사용) */
  labelOf?: (data: Record<string, unknown>) => string;
}

/**
 * 운영 리소스 공통 CRUD 훅.
 * 목록 로드 + 선택 + 등록/수정 다이얼로그 + 삭제 확인을 한 번에 제공한다.
 * 모든 변경은 백엔드 감사로그(해시체인)에 자동 기록된다.
 */
export function useResourceCrud({ type, title, fields, fallback = [], labelOf }: UseResourceCrudOptions) {
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [selected, setSelected] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [initial, setInitial] = useState<DialogValues>({});

  const reload = useCallback(async () => {
    const list = await listResources(type, fallback);
    setRows(list);
    setSelected((s) => Math.min(s, Math.max(list.length - 1, 0)));
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

  const openCreate = () => {
    setDialogMode('create');
    setInitial(emptyValues);
    setDialogOpen(true);
  };

  const openEdit = () => {
    if (!selectedRow) {
      window.alert('수정할 행을 먼저 선택하세요.');
      return;
    }
    setDialogMode('edit');
    setInitial({ ...emptyValues, ...selectedRow.data });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedRow) {
      window.alert('삭제할 행을 먼저 선택하세요.');
      return;
    }
    const label = labelOf?.(selectedRow.data) ?? selectedRow.id;
    if (!window.confirm(`'${label}' 을(를) 삭제(비활성)하시겠습니까?\n삭제 이력은 감사로그에 기록됩니다.`)) return;
    try {
      await deleteResource(type, selectedRow.id);
      await reload();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제에 실패했습니다. 백엔드 기동 여부를 확인하세요.');
    }
  };

  const handleSubmit = async (values: DialogValues) => {
    if (dialogMode === 'create') {
      await createResource(type, values);
    } else if (selectedRow) {
      await updateResource(type, selectedRow.id, values);
    }
    await reload();
  };

  const dialog = (
    <EditDialog
      open={dialogOpen}
      mode={dialogMode}
      title={title}
      fields={fields}
      initial={initial}
      onClose={() => setDialogOpen(false)}
      onSubmit={handleSubmit}
    />
  );

  return { rows, selected, setSelected, selectedRow, reload, openCreate, openEdit, handleDelete, dialog };
}
