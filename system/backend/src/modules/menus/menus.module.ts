import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Menu } from './menu.entity';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
