import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MenusModule } from './modules/menus/menus.module';
import { CommonCodesModule } from './modules/common-codes/common-codes.module';
import { SecurityModule } from './modules/security/security.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { SeedService } from './database/seed/seed.service';
import { Menu } from './modules/menus/menu.entity';
import { User } from './modules/users/user.entity';
import { CommonCodeGroup, CommonCodeItem } from './modules/common-codes/common-code.entity';
import { MaskingPolicy } from './modules/security/entities/masking-policy.entity';
import { AdminResource } from './modules/resources/admin-resource.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        autoLoadEntities: true,
        // 개발 전용 — 운영은 마이그레이션으로 전환
        synchronize: config.get<boolean>('database.synchronize'),
        retryAttempts: 3,
        retryDelay: 2000,
      }),
    }),
    TypeOrmModule.forFeature([Menu, User, CommonCodeGroup, CommonCodeItem, MaskingPolicy, AdminResource]),
    SecurityModule,
    AuthModule,
    UsersModule,
    MenusModule,
    CommonCodesModule,
    DashboardModule,
    ResourcesModule,
  ],
  providers: [
    SeedService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: AuditLogInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
