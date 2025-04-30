import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateCommonExpensesDto } from './dto/create-common-expenses.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonExpense } from './entities/expenses.entity';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('common-expense/:boothId/:year')
  @ApiOperation({ summary: 'Obtener gastos comunes por año y caseta' })
  @ApiResponse({
    status: 200,
    description: 'Gastos comunes obtenidos exitosamente',
    type: [CommonExpense],
  })
  async getCommonExpensesByUserIdAndBoothId(
    @Param('boothId') boothId: number,
    @Param('year') year: number,
  ) {
    return this.expensesService.getCommonExpensesByBoothIdAndYear(
      boothId,
      year,
    );
  }
  @Post('common-expense')
  @ApiOperation({ summary: 'Crear una nueva gasto común' })
  @ApiResponse({
    status: 201,
    description: 'Gasto común creado exitosamente',
    type: CommonExpense,
  })
  async createCommonExpenses(
    @Body() createCommonExpensesDto: CreateCommonExpensesDto,
  ) {
    return this.expensesService.createCommonExpenses(createCommonExpensesDto);
  }
}
