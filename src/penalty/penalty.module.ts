import { Module } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { PenaltyController } from './penalty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penalty } from './entities/penalty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penalty])],
  providers: [PenaltyService],
  controllers: [PenaltyController]
})
export class PenaltyModule {}
