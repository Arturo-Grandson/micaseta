import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateExpenseCostDto {
  @ApiProperty({
    description: 'ID del gasto común',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  expenseId: number;

  @ApiProperty({
    description: 'Coste total del gasto',
    example: 150.5,
  })
  @IsNumber()
  @IsNotEmpty()
  totalCost: number;
}
