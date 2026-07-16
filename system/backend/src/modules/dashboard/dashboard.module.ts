import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/user.entity';
import { LoginHistory } from '../security/entities/login-history.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, LoginHistory])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
