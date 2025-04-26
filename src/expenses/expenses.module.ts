import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonExpense } from './entities/expenses.entity';
import { CommonExpenseParticipant } from './entities/expenses-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonExpense, CommonExpenseParticipant])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
