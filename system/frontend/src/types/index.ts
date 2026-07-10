// ── 공용 타입 정의 ─────────────────────────────────────────────

export interface User {
  id: string;
  loginId: string;
  name: string;
  email: string;
  userGroup: string;
  tenantId: string;
  roles: string[];
}

export interface LoginResult {
  accessToken: string;
  user: User;
}

export interface MenuNode {
  menuCode: string;
  name: string;
  nameEn?: string | null;
  menuType: 'GROUP' | 'MENU';
  channel?: string;
  path?: string | null;
  screenId?: string | null;
  icon?: string;
  sortOrder: number;
  requiresStepUp?: boolean;
  children?: MenuNode[];
}

export interface Paged<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}

// ── 대시보드 ──────────────────────────────────────────────────

export interface DashboardSummary {
  stats: {
    pendingJournals: number;
    monthlyJournals: number;
    closingStatus: string;
    activeUsers: number;
  };
  taxSchedules: TaxSchedule[];
  recentLogins: RecentLogin[];
  notices: Notice[];
}

export interface TaxSchedule {
  name: string;
  dueDate: string;
  dday: string;
  status: string;
}

export interface RecentLogin {
  loginId: string;
  name: string;
  ip: string;
  loginAt: string;
  result: string;
}

export interface Notice {
  title: string;
  date: string;
}

// ── 보안 ─────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  createdAt: string;
  loginId: string;
  userName: string;
  action: string;
  resource: string;
  menuCode: string;
  ip: string;
  result: string;
  chainHash: string;
}

export interface PrivacyAccessLog {
  id: string;
  createdAt: string;
  loginId: string;
  userName: string;
  targetType: string;
  targetName: string;
  dataItems: string[];
  purpose: string;
  accessType: string;
}

export interface LoginHistory {
  id: string;
  loginAt: string;
  loginId: string;
  name: string;
  ip: string;
  userAgent: string;
  result: string;
}

export interface MaskingPolicy {
  id: string;
  dataType: string;
  fieldName: string;
  maskPattern: string;
  description: string;
  isActive: boolean;
}

// ── 시스템 관리 ───────────────────────────────────────────────

/** 확장 프로필 (설계 OP-06A UserDetail) */
export interface UserDetailProfile {
  userIdCode?: string;
  nameEn?: string;
  externalId?: string;
  operatorOrg?: string;
  department?: string;
  position?: string;
  primaryBookkeeper?: string;
  notify?: string;
  locale?: string;
  timezone?: string;
  scope?: string;
  startDate?: string;
  endDate?: string;
  accountExpire?: string;
  defaultGroup?: string;
  defaultRole?: string;
  roleExpire?: string;
  reason?: string;
  /** [배정유형, 그룹/Role, 데이터범위, 시작일, 종료일, 상태] */
  assignments?: string[][];
  history?: string[];
}

export interface ManagedUser {
  id: string;
  loginId: string;
  name: string;
  email: string;
  phone: string;
  userGroup: string;
  tenantId: string;
  status: string;
  roles: string[];
  lastLoginAt: string | null;
  detail?: UserDetailProfile | null;
}

export interface FlatMenu {
  id: string;
  menuCode: string;
  parentCode: string | null;
  channel: string;
  menuType: 'GROUP' | 'MENU';
  name: string;
  path: string | null;
  screenId: string | null;
  sortOrder: number;
  isVisible: boolean;
  requiresStepUp: boolean;
}

export interface CommonCodeGroup {
  groupCode: string;
  groupName: string;
  nameEn?: string | null;
  domain?: string | null;
  policy?: string | null;
  description?: string | null;
  items: CommonCodeItem[];
}

export interface CommonCodeItem {
  code: string;
  name: string;
  nameEn?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface RoleSummary {
  roleCode: string;
  roleName: string;
  description: string;
  userCount: number;
  permissions: string[];
}
