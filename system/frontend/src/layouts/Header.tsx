import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useMenuStore } from '../stores/menuStore';

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const sidebarOpen = useMenuStore((s) => s.sidebarOpen);
  const toggleSidebar = useMenuStore((s) => s.toggleSidebar);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <button
        className={`menu-toggle${sidebarOpen ? ' on' : ''}`}
        onClick={toggleSidebar}
        title={sidebarOpen ? '메뉴 숨기기' : '메뉴 보기'}
      >
        ☰ <span className="mt-label">{sidebarOpen ? '메뉴 숨기기' : '메뉴 보기'}</span>
      </button>
      <div className="brand">
        <div className="ey-logo">
          <span>EY</span>
        </div>
        <span className="tagline">BK 회계·세무 서비스</span>
      </div>

      <select className="company-select" defaultValue="1000" title="회사선택">
        <option value="1000">㈜비케이테스트 · 1000</option>
      </select>

      <input className="global-search" type="text" placeholder="메뉴·거래처·전표 검색 (Ctrl+K)" />

      <div className="utils">
        <button className="util-btn" title="알림">
          🔔
        </button>
        <button className="util-btn" title="도움말">
          ❔
        </button>
        <div className="user-chip">
          <div className="avatar">{user?.name?.charAt(0) ?? '?'}</div>
          <span className="user-name">{user?.name ?? '사용자'}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  );
}
