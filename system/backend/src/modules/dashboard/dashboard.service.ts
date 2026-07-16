import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../users/user.entity';
import { LoginHistory } from '../security/entities/login-history.entity';

/**
 * TN-00 대시보드.
 * 전표/마감/신고 데이터는 해당 페이즈 구현 전이므로 예시 값을 반환하고,
 * 사용자/로그인 등 구현된 데이터는 실제 집계한다.
 */
@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    @InjectRepository(LoginHistory)
    private readonly loginRepo: EntityRepository<LoginHistory>,
  ) {}

  async summary() {
    const [activeUsers, recentLogins] = await Promise.all([
      this.userRepo.count({ status: 'ACTIVE' }),
      this.loginRepo.find({}, { orderBy: { id: 'DESC' }, limit: 5 }),
    ]);

    return {
      stats: {
        pendingJournals: 12,
        monthlyJournals: 248,
        closingStatus: '2026-06 가마감',
        activeUsers,
      },
      taxSchedules: [
        { name: '원천세 신고·납부', dueDate: '2026-07-10', dday: 'D-1', status: '긴급' },
        { name: '부가가치세 확정신고', dueDate: '2026-07-25', dday: 'D-16', status: '진행중' },
        { name: '지급명세서 제출', dueDate: '2026-07-31', dday: 'D-22', status: '대기' },
        { name: '법인세 중간예납', dueDate: '2026-08-31', dday: 'D-53', status: '대기' },
      ],
      recentLogins: recentLogins.map((l) => ({
        loginId: l.loginId,
        name: l.name,
        ip: l.ip,
        loginAt: l.createdAt,
        result: l.result,
      })),
      notices: [
        { title: 'BK 프레임워크 v0.1 구축 — 로그인/메뉴/공통기반', date: '2026-07-09' },
        { title: '페이즈 03 일반전표입력(SA-JNL-01) 개발 예정', date: '2026-07-09' },
      ],
    };
  }
}
