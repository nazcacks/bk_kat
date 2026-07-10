import { useEffect, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import Badge, { type BadgeVariant } from '../components/common/Badge';
import DataGrid, { type DataGridColumn } from '../components/common/DataGrid';
import { fetchDashboardSummary } from '../api/dashboard';
import type { DashboardSummary, TaxSchedule } from '../types';

function ddayVariant(dday: string): BadgeVariant {
  const n = parseInt(dday.replace(/[^\-0-9]/g, ''), 10);
  if (Number.isNaN(n)) return 'gray';
  if (n <= 3) return 'red';
  if (n <= 20) return 'yellow';
  return 'blue';
}

function statusVariant(status: string): BadgeVariant {
  if (status === '긴급') return 'red';
  if (status === '진행중') return 'blue';
  return 'gray';
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    void fetchDashboardSummary().then(setSummary);
  }, []);

  const scheduleColumns: DataGridColumn<TaxSchedule>[] = [
    { key: 'name', header: '신고 항목' },
    { key: 'dueDate', header: '기한', width: 110 },
    {
      key: 'dday',
      header: 'D-Day',
      width: 80,
      align: 'center',
      render: (r) => <Badge variant={ddayVariant(r.dday)}>{r.dday}</Badge>,
    },
    {
      key: 'status',
      header: '상태',
      width: 80,
      align: 'center',
      render: (r) => <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    },
  ];

  if (!summary) {
    return (
      <div>
        <PageHeader title="홈 · 현황" screenId="TN-00" breadcrumb={['테넌트', '홈·현황', '대시보드']} />
        <div className="panel">불러오는 중…</div>
      </div>
    );
  }

  const { stats, taxSchedules, recentLogins, notices } = summary;

  return (
    <div>
      <PageHeader title="홈 · 현황" screenId="TN-00" breadcrumb={['테넌트', '홈·현황', '대시보드']} />

      <div className="stat-cards">
        <StatCard label="미결전표" value={`${stats.pendingJournals}건`} sub="결재 대기 중" color="var(--ey-red)" />
        <StatCard label="이번 달 전표" value={`${stats.monthlyJournals}건`} sub="2026년 7월 입력분" color="var(--ey-blue)" />
        <StatCard label="마감상태" value={stats.closingStatus} sub="확정마감 전" color="var(--ey-yellow)" />
        <StatCard label="활성 사용자" value={`${stats.activeUsers}명`} sub="현재 테넌트 기준" color="var(--ey-green)" />
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-title">📅 신고 일정</div>
          <DataGrid columns={scheduleColumns} rows={taxSchedules} rowKey={(r) => r.name} />
        </div>

        <div>
          <div className="panel">
            <div className="panel-title">🔐 최근 로그인 / 보안 이벤트</div>
            <ul className="simple-list">
              {recentLogins.map((l, i) => (
                <li key={i}>
                  <Badge variant={l.result === 'SUCCESS' ? 'green' : 'red'}>
                    {l.result === 'SUCCESS' ? '성공' : '실패'}
                  </Badge>
                  <span>
                    {l.name} ({l.loginId})
                  </span>
                  <span className="meta">
                    {l.ip} · {l.loginAt}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <div className="panel-title">📢 공지사항</div>
            <ul className="simple-list">
              {notices.map((n, i) => (
                <li key={i}>
                  <span>{n.title}</span>
                  <span className="meta">{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
