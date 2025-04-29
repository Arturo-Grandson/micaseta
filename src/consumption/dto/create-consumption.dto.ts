import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsumptionItemDto {
  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Cantidad consumida',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateConsumptionDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID de la caseta',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  boothId: number;

  @ApiProperty({
    description: 'Tipo de festividad',
    example: 'sj',
  })
  @IsNotEmpty()
  festiveType: string;

  @ApiProperty({
    description: 'Año',
    example: 2024,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Lista de productos consumidos',
    type: [ConsumptionItemDto],
    example: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsumptionItemDto)
  items: ConsumptionItemDto[];
}
