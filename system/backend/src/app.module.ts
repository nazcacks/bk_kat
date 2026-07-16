import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
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
import { createMikroOrmOptions } from './database/mikro-orm.options';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createMikroOrmOptions({
        host: config.getOrThrow<string>('database.host'),
        port: config.getOrThrow<number>('database.port'),
        username: config.getOrThrow<string>('database.username'),
        password: config.getOrThrow<string>('database.password'),
        database: config.getOrThrow<string>('database.database'),
        debug: config.get<boolean>('database.debug'),
      }),
    }),
    MikroOrmModule.forFeature([Menu, User, CommonCodeGroup, CommonCodeItem, MaskingPolicy, AdminResource]),
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
