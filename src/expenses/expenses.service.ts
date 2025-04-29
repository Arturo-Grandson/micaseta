import { CommonExpense } from './entities/expenses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommonExpensesDto } from './dto/create-common-expenses.dto';
import { CommonExpenseParticipant } from './entities/expenses-participant.entity';
import { Booth } from 'src/booth/entities/booth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(CommonExpense)
    private commonExpensesRepo: Repository<CommonExpense>,
    @InjectRepository(CommonExpenseParticipant)
    private participantRepo: Repository<CommonExpenseParticipant>,
    @InjectRepository(Booth)
    private boothRepo: Repository<Booth>,
  ) {}

  async createCommonExpenses(createCommonExpensesDto: CreateCommonExpensesDto) {
    const commonExpense = this.commonExpensesRepo.create(
      createCommonExpensesDto,
    );
    return this.commonExpensesRepo.save(commonExpense);
  }
}
