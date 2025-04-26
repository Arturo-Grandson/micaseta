import { Module } from '@nestjs/common';
import { BoothService } from './booth.service';
import { BoothController } from './booth.controller';
import { Booth } from './entities/booth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoothMember } from './entities/booth-member.entity';
import { BoothRole } from './entities/booth-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booth, BoothMember, BoothRole])],
  providers: [BoothService],
  controllers: [BoothController]
})
export class BoothModule {}
