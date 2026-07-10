import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menu } from './menu.entity';
import { Audit } from '../../common/decorators/audit.decorator';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @Audit('MENU', 'CREATE')
  create(@Body() body: Partial<Menu>) {
    return this.menusService.create(body);
  }

  @Put(':id')
  @Audit('MENU', 'UPDATE')
  update(@Param('id') id: string, @Body() body: Partial<Menu>) {
    return this.menusService.update(id, body);
  }

  @Delete(':id')
  @Audit('MENU', 'DELETE')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }

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
