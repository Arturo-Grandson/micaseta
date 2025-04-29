import { FestiveTypeEnum } from '@/enums/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommonExpensesDto {
  @ApiProperty({
    description: 'Tipo de festividad',
    example: 'sj(san juan) o f(feria)',
  })
  @IsNotEmpty()
  festiveType: FestiveTypeEnum;

  @ApiProperty({
    description: 'Año',
    example: 2024,
  })
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Descripción del gasto',
    example: 'Frigorifico nuevo',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Monto del gasto',
    example: 360.5,
  })
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    description: 'fecha',
    example: '2024-01-01',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'id caseta',
    example: 1,
  })
  @IsNotEmpty()
  boothId: number;
}
