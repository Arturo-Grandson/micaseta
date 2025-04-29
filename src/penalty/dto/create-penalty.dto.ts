import { FestiveTypeEnum } from '@/enums/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePenaltyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'tipo de festividad',
    example: 'sj(san juan) f(feria)',
  })
  festiveType: FestiveTypeEnum;

  @IsNotEmpty()
  @ApiProperty({
    description: 'anio de la festividad',
    example: 2025,
  })
  year: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'total de la multa',
    example: 15,
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'razon de la multa',
    example: 'no montar',
  })
  reason: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'fecha de la multa',
    example: '2025-01-01',
  })
  date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'id del usuario',
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'id de la caseta',
    example: 1,
  })
  boothId: number;
}
