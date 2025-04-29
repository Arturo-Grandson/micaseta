import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonExpense } from './entities/expenses.entity';
import { CommonExpenseParticipant } from './entities/expenses-participant.entity';
import { OptionalExpense } from './entities/optional-expense.entity';
import { OptionalExpenseParticipant } from './entities/optional-expense-participant.entity';
import { User } from '@/users/entities/user.entity';
import { Booth } from '@/booth/entities/booth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommonExpense,
      CommonExpenseParticipant,
      OptionalExpense,
      OptionalExpenseParticipant,
      Booth,
      User,
    ]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
