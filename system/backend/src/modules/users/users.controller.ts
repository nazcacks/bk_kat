import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PageRequestDto } from '../../common/dto/page.dto';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Audit } from '../../common/decorators/audit.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Audit('USER', 'CREATE')
  create(@Body() body: Partial<User>) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  @Audit('USER', 'UPDATE')
  update(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.usersService.updateUser(id, body);
  }

  /** 삭제 = DISABLED 처리 (물리 삭제 금지) */
  @Delete(':id')
  @Audit('USER', 'DISABLE')
  remove(@Param('id') id: string) {
    return this.usersService.disableUser(id);
  }

  /** 사용자 목록 (개인정보 마스킹 적용) */
  @Get()
  findAll(@Query() req: PageRequestDto) {
    return this.usersService.findAllMasked(req);
  }

  /** 개인정보 평문 조회 — reason 쿼리 필수, PersonalDataAccessLog 기록 */
  @Get(':id/plain')
  findOnePlain(
    @Param('id') id: string,
    @Query('reason') reason: string,
    @CurrentUser() actor: AuthUser,
    @Req() req: Request,
  ) {
    return this.usersService.findOnePlain(
      id,
      reason,
      actor,
      req.ip,
      (req as any).requestId,
    );
  }
}
