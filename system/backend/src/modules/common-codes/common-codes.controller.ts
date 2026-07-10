import { Controller, Get, Param } from '@nestjs/common';
import { CommonCodesService } from './common-codes.service';

@Controller('common-codes')
export class CommonCodesController {
  constructor(private readonly commonCodesService: CommonCodesService) {}

  /** 전체 그룹 + 항목 (공통코드 관리 화면용) */
  @Get()
  findAll() {
    return this.commonCodesService.findAllGrouped();
  }

  /** 특정 그룹의 코드 항목 (콤보박스 바인딩용) */
  @Get(':groupCode')
  findItems(@Param('groupCode') groupCode: string) {
    return this.commonCodesService.findItems(groupCode);
  }
}
