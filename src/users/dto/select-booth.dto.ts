import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SelectBoothDto {
  @ApiProperty({
    description: 'ID de la caseta a seleccionar',
    example: 1,
  })
  @IsNumber()
  boothId: number;
}
