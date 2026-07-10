import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SecurityService } from './security.service';
import { MaskingPolicy } from './entities/masking-policy.entity';
import { PageRequestDto } from '../../common/dto/page.dto';
import { Audit } from '../../common/decorators/audit.decorator';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('audit-logs')
  findAuditLogs(@Query() req: PageRequestDto) {
    return this.securityService.findAuditLogs(req);
  }

  @Get('audit-logs/verify-chain')
  verifyChain() {
    return this.securityService.verifyAuditChain();
  }

  @Get('privacy-access-logs')
  findPrivacyLogs(@Query() req: PageRequestDto) {
    return this.securityService.findPrivacyAccessLogs(req);
  }

  @Get('login-histories')
  findLoginHistories(@Query() req: PageRequestDto) {
    return this.securityService.findLoginHistories(req);
  }

  @Get('masking-policies')
  findMaskingPolicies() {
    return this.securityService.findMaskingPolicies();
  }

  @Post('masking-policies')
  @Audit('MASKING_POLICY', 'CREATE')
  createMaskingPolicy(@Body() body: Partial<MaskingPolicy>) {
    return this.securityService.createMaskingPolicy(body);
  }

  @Put('masking-policies/:id')
  @Audit('MASKING_POLICY', 'UPDATE')
  updateMaskingPolicy(@Param('id') id: string, @Body() body: Partial<MaskingPolicy>) {
    return this.securityService.updateMaskingPolicy(id, body);
  }

  @Delete('masking-policies/:id')
  @Audit('MASKING_POLICY', 'DELETE')
  removeMaskingPolicy(@Param('id') id: string) {
    return this.securityService.removeMaskingPolicy(id);
  }
}
