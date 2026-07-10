import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { PersonalDataAccessLog } from './entities/personal-data-access-log.entity';
import { LoginHistory } from './entities/login-history.entity';
import { MaskingPolicy } from './entities/masking-policy.entity';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';

/**
 * 보안·개인정보보호 모듈 (Global)
 * 감사로그 / 개인정보 접근로그 / 로그인 이력 / 마스킹 정책.
 * 전 모듈이 SecurityService 를 통해 기록한다.
 */
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog, PersonalDataAccessLog, LoginHistory, MaskingPolicy]),
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
