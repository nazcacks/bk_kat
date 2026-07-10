import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommonCodesService } from './common-codes.service';
import { CommonCodeGroup, CommonCodeItem } from './common-code.entity';
import { Audit } from '../../common/decorators/audit.decorator';

@Controller('common-codes')
export class CommonCodesController {
  constructor(private readonly commonCodesService: CommonCodesService) {}

  /** 전체 그룹 + 항목 (공통코드 관리 화면용) */
  @Get()
  findAll() {
    return this.commonCodesService.findAllGrouped();
  }

  // ── 마스터(코드그룹) CRUD ──
  @Post('groups')
  @Audit('COMMON_CODE_GROUP', 'CREATE')
  createGroup(@Body() body: Partial<CommonCodeGroup>) {
    return this.commonCodesService.createGroup(body);
  }

  @Put('groups/:groupCode')
  @Audit('COMMON_CODE_GROUP', 'UPDATE')
  updateGroup(@Param('groupCode') groupCode: string, @Body() body: Partial<CommonCodeGroup>) {
    return this.commonCodesService.updateGroup(groupCode, body);
  }

  @Delete('groups/:groupCode')
  @Audit('COMMON_CODE_GROUP', 'DELETE')
  removeGroup(@Param('groupCode') groupCode: string) {
    return this.commonCodesService.removeGroup(groupCode);
  }

  // ── 세부(코드항목) CRUD ──
  @Post(':groupCode/items')
  @Audit('COMMON_CODE_ITEM', 'CREATE')
  createItem(@Param('groupCode') groupCode: string, @Body() body: Partial<CommonCodeItem>) {
    return this.commonCodesService.createItem(groupCode, body);
  }

  @Put(':groupCode/items/:code')
  @Audit('COMMON_CODE_ITEM', 'UPDATE')
  updateItem(
    @Param('groupCode') groupCode: string,
    @Param('code') code: string,
    @Body() body: Partial<CommonCodeItem>,
  ) {
    return this.commonCodesService.updateItem(groupCode, code, body);
  }

  @Delete(':groupCode/items/:code')
  @Audit('COMMON_CODE_ITEM', 'DELETE')
  removeItem(@Param('groupCode') groupCode: string, @Param('code') code: string) {
    return this.commonCodesService.removeItem(groupCode, code);
  }

  /** 특정 그룹의 코드 항목 (콤보박스 바인딩용) — 동적 라우트는 마지막에 배치 */
  @Get(':groupCode')
  findItems(@Param('groupCode') groupCode: string) {
    return this.commonCodesService.findItems(groupCode);
  }
}
