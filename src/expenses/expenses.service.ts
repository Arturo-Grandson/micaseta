import { Injectable } from '@nestjs/common';
import { CommonExpense } from './entities/expenses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommonExpensesDto } from './dto/create-common-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(CommonExpense)
    private commonExpensesRepo: Repository<CommonExpense>,
  ) {}

  async createCommonExpenses(createCommonExpensesDto: CreateCommonExpensesDto) {
    const commonExpense = this.commonExpensesRepo.create(
      createCommonExpensesDto,
    );
    return this.commonExpensesRepo.save(commonExpense);
  }
}
