import { useLocation } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { findMenuByPath, useMenuStore } from '../stores/menuStore';

export default function PlaceholderPage() {
  const location = useLocation();
  const tree = useMenuStore((s) => s.tree);
  const { menu, trail } = findMenuByPath(tree, location.pathname);

  const title = menu?.name ?? '준비 중';
  const screenId = menu?.screenId ?? undefined;
  const breadcrumb = trail.length > 0 ? trail.map((n) => n.name) : [title];

  return (
    <div>
      <PageHeader title={title} screenId={screenId} breadcrumb={breadcrumb} />
      <div className="panel placeholder-page">
        <div className="icon">🧩</div>
        <h2>
          {title}
          {screenId && <span className="screen-id-badge">{screenId}</span>}
        </h2>
        <p>이 화면은 개발 페이즈에 따라 순차 구현됩니다 (프레임워크 v0.1)</p>
      </div>
    </div>
  );
}
