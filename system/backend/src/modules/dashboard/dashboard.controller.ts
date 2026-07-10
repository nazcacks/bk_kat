import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /** TN-00 홈·현황 대시보드 요약 */
  @Get('summary')
  summary() {
    return this.dashboardService.summary();
  }
}
