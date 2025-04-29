import { Module } from '@nestjs/common';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';
import { Consumption } from './entities/consumption.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booth } from '@/booth/entities/booth.entity';
import { Product } from '@/product/entities/product.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption, Product, User, Booth])],
  controllers: [ConsumptionController],
  providers: [ConsumptionService],
})
export class ConsumptionModule {}
