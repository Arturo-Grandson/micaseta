import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booth } from './entities/booth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoothDto } from './dto/create-booth.dto';

@Injectable()
export class BoothService {
  constructor(
    @InjectRepository(Booth)
    private boothRepo: Repository<Booth>
  ){}

  async createBooth(createBoothDto: CreateBoothDto): Promise<Booth>{
    return this.boothRepo.save(createBoothDto);
  }
}

