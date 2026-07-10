import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCodeGroup, CommonCodeItem } from './common-code.entity';
import { CommonCodesService } from './common-codes.service';
import { CommonCodesController } from './common-codes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommonCodeGroup, CommonCodeItem])],
  controllers: [CommonCodesController],
  providers: [CommonCodesService],
  exports: [CommonCodesService],
})
export class CommonCodesModule {}
