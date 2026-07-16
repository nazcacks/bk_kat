import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonCodeGroup, CommonCodeItem } from './common-code.entity';
import { CommonCodesService } from './common-codes.service';
import { CommonCodesController } from './common-codes.controller';

@Module({
  imports: [MikroOrmModule.forFeature([CommonCodeGroup, CommonCodeItem])],
  controllers: [CommonCodesController],
  providers: [CommonCodesService],
  exports: [CommonCodesService],
})
export class CommonCodesModule {}
