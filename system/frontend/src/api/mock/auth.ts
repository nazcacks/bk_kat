import type { LoginResult, User } from '../../types';

export const mockUser: User = {
  id: 'mock-user-001',
  loginId: 'admin',
  name: '김관리',
  email: 'admin@bktest.co.kr',
  userGroup: 'TENANT_ADMIN',
  tenantId: 'bk-test-tenant',
  roles: ['COMPANY_ADMIN', 'ACCOUNTING', 'TAX'],
};

export function mockLogin(loginId: string): LoginResult {
  return {
    accessToken: 'mock-dev-token-' + Date.now(),
    user: { ...mockUser, loginId: loginId || 'admin' },
  };
}
