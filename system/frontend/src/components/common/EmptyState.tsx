interface EmptyStateProps {
  icon?: string;
  message?: string;
}

export default function EmptyState({ icon = '📭', message = '표시할 데이터가 없습니다.' }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="icon">{icon}</div>
      <div>{message}</div>
    </div>
  );
}
