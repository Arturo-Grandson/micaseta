import { Module } from '@nestjs/common';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';
import { Consumption } from './entities/consumption.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption])],
  controllers: [ConsumptionController],
  providers: [ConsumptionService]
})
export class ConsumptionModule {}
