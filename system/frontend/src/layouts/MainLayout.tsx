import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AccessModeBanner from './AccessModeBanner';
import { useMenuStore } from '../stores/menuStore';

export default function MainLayout() {
  const loadMenus = useMenuStore((s) => s.loadMenus);
  const sidebarOpen = useMenuStore((s) => s.sidebarOpen);

  useEffect(() => {
    void loadMenus();
  }, [loadMenus]);

  return (
    <div>
      <Header />
      <AccessModeBanner />
      <div className="app-body">
        {sidebarOpen && <Sidebar />}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
