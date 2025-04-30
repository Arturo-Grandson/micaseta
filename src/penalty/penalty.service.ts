import { Injectable, NotFoundException } from '@nestjs/common';
import { Penalty } from './entities/penalty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePenaltyDto } from './dto/create-penalty.dto';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private penaltyRepo: Repository<Penalty>,
  ) {}

  async getPenaltiesByUserIdAndBoothId(userId: number, boothId: number) {
    const penalties = await this.penaltyRepo.find({
      where: {
        user: { id: userId },
        booth: { id: boothId },
        year: new Date().getFullYear(),
      },
    });
    return penalties;
  }

  async createPenalty(createPenaltyDto: CreatePenaltyDto) {
    const { festiveType, year, amount, reason, date, userId, boothId } =
      createPenaltyDto;

    const penalty = this.penaltyRepo.create({
      festiveType,
      year,
      amount,
      reason,
      date,
      user: { id: userId },
      booth: { id: boothId },
    });
    return await this.penaltyRepo.save(penalty);
  }

  async deletePenaltyByUserId(id: number) {
    const penalty = await this.penaltyRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!penalty) {
      throw new NotFoundException('Penalty not found');
    }

    return this.penaltyRepo.remove(penalty);
  }
}
