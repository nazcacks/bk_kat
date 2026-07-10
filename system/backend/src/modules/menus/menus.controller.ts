import { Controller, Get, Query } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  /** 사이드바용 메뉴 트리 (channel 미지정 시 OP/TN/CO 전체) */
  @Get('tree')
  findTree(@Query('channel') channel?: string) {
    return this.menusService.findTree(channel || undefined);
  }

  /** 관리용 평면 목록 */
  @Get()
  findAll(@Query('channel') channel?: string) {
    return this.menusService.findAll(channel);
  }
}
