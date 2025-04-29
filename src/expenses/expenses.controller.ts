import { Body, Controller, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateCommonExpensesDto } from './dto/create-common-expenses.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('common-expense')
  async createCommonExpenses(
    @Body() createCommonExpensesDto: CreateCommonExpensesDto,
  ) {
    return this.expensesService.createCommonExpenses(createCommonExpensesDto);
  }
}
