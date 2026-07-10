interface PaginationProps {
  page: number;
  size: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, size, total, onChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / size));
  const windowSize = 5;
  const start = Math.max(1, Math.min(page - Math.floor(windowSize / 2), totalPages - windowSize + 1));
  const end = Math.min(totalPages, start + windowSize - 1);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(1)}>
        «
      </button>
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹
      </button>
      {pages.map((p) => (
        <button key={p} className={p === page ? 'current' : ''} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        ›
      </button>
      <button disabled={page >= totalPages} onClick={() => onChange(totalPages)}>
        »
      </button>
      <span className="total-info">
        총 {total.toLocaleString()}건 · {page}/{totalPages} 페이지
      </span>
    </div>
  );
}
