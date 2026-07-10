import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  screenId?: string;
  breadcrumb?: string[];
  actions?: ReactNode;
}

export default function PageHeader({ title, screenId, breadcrumb, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="titles">
        <h1>
          {title}
          {screenId && <span className="screen-id-badge">{screenId}</span>}
        </h1>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="breadcrumb">{breadcrumb.join(' > ')}</div>
        )}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}
