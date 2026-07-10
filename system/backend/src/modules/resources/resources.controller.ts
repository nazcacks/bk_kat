import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { Audit } from '../../common/decorators/audit.decorator';

/**
 * 운영 콘솔 공통 리소스 CRUD.
 * 모든 변경(POST/PUT/DELETE)은 AuditLogInterceptor 에 의해 감사로그(해시체인)에 자동 기록된다.
 */
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get(':type')
  findAll(@Param('type') type: string) {
    return this.resourcesService.findAll(type);
  }

  @Post(':type')
  @Audit('ADMIN_RESOURCE', 'CREATE')
  create(@Param('type') type: string, @Body() body: Record<string, unknown>) {
    return this.resourcesService.create(type, body);
  }

  @Put(':type/:id')
  @Audit('ADMIN_RESOURCE', 'UPDATE')
  update(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.resourcesService.update(type, id, body);
  }

  @Delete(':type/:id')
  @Audit('ADMIN_RESOURCE', 'DELETE')
  remove(@Param('type') type: string, @Param('id') id: string) {
    return this.resourcesService.remove(type, id);
  }
}
