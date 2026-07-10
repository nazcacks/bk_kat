import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { mockMenuTree } from './api/mock/menus';
import { flattenMenuTree } from './stores/menuStore';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';
import OperationsDashboardPage from './pages/operator/OperationsDashboardPage';
import TenantInfraPage from './pages/operator/TenantInfraPage';
import UserManagementPage from './pages/operator/UserManagementPage';
import UserGroupsPage from './pages/operator/UserGroupsPage';
import GroupMenuPermissionPage from './pages/operator/GroupMenuPermissionPage';
import AuthPolicyPage from './pages/operator/AuthPolicyPage';
import MenuMasterPage from './pages/operator/MenuMasterPage';
import RolePermissionPage from './pages/operator/RolePermissionPage';
import CommonCodePage from './pages/operator/CommonCodePage';
import BatchIntegrationPage from './pages/operator/BatchIntegrationPage';
import LogManagementPage from './pages/operator/LogManagementPage';
import PrivacyProtectionPage from './pages/operator/PrivacyProtectionPage';
import AccessGovernancePage from './pages/operator/AccessGovernancePage';

function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.accessToken);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

/**
 * 구현 완료된 화면: 경로 → 컴포넌트 매핑. 나머지는 PlaceholderPage.
 * 시스템관리자_화면_v1.0.HTML 화면군 (OP-01/03/05C/06A~D/07/09/10/12)
 */
const implementedPages: Record<string, ReactNode> = {
  '/dashboard': <DashboardPage />,
  '/operator/op/01/m01': <OperationsDashboardPage />,
  '/operator/op/03/m01': <TenantInfraPage />,
  '/operator/op/05/m01': <CommonCodePage />,
  '/operator/op/06/m01': <UserManagementPage />,
  '/operator/op/06/m02': <UserGroupsPage />,
  '/operator/op/06/m03': <AuthPolicyPage />,
  '/operator/op/06/m04': <MenuMasterPage />,
  '/operator/op/06/m05': <RolePermissionPage />,
  '/operator/op/06/m06': <GroupMenuPermissionPage />,
  '/operator/op/07/m01': <AccessGovernancePage />,
  '/operator/op/09/m01': <BatchIntegrationPage />,
  '/operator/op/10/m01': <LogManagementPage />,
  '/operator/op/12/m01': <PrivacyProtectionPage />,
};

// 메뉴 카탈로그(3채널 트리)를 재귀 flatten 하여 path 있는 모든 MENU 를 라우트로 생성
const seenPaths = new Set<string>();
const menuRoutes = flattenMenuTree(mockMenuTree)
  .filter((menu) => menu.menuType === 'MENU' && !!menu.path)
  .filter((menu) => {
    if (seenPaths.has(menu.path as string)) return false;
    seenPaths.add(menu.path as string);
    return true;
  })
  .map((menu) => ({
    path: menu.path as string,
    element: implementedPages[menu.path as string] ?? <PlaceholderPage />,
  }));

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...menuRoutes,
      { path: '*', element: <PlaceholderPage /> },
    ],
  },
]);
