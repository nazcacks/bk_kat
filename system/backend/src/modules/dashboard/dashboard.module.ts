import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { LoginHistory } from '../security/entities/login-history.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, LoginHistory])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
