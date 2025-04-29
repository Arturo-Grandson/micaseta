import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FestiveTypeEnum } from 'src/enums/enums';

export class CreateExpenseParticipantDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID del gasto común',
    example: 1,
  })
  @IsNumber()
  expenseId: number;

  @ApiProperty({
    description: 'ID de la caseta',
    example: 1,
  })
  @IsNumber()
  boothId: number;

  @ApiProperty({
    description: 'Tipo de festividad',
    example: 'sj',
    enum: FestiveTypeEnum,
  })
  @IsEnum(FestiveTypeEnum)
  festiveType: FestiveTypeEnum;

  @ApiProperty({
    description: 'Año',
    example: 2024,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Indica si el usuario lleva invitados',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  hasGuests?: boolean;

  @ApiProperty({
    description: 'Número de invitados que lleva el usuario',
    example: 2,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  guestCount?: number;
}
