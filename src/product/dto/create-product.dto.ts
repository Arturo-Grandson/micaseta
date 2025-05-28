import { ProductTypeEnum } from '@/enums/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductPriceDto {
  @ApiProperty({
    description: 'Precio del producto en Euros',
    example: 10,
  })
  @IsNumber()
  price: number;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'cerveza',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Tipo de producto',
    example: 'drink o food',
  })
  @IsEnum(ProductTypeEnum)
  type: string;

  @ApiProperty({
    description: 'ID de la caseta donde se registrará el producto',
    example: 1,
  })
  @IsNumber()
  boothId: number;

  @ApiProperty({
    description: 'Precio del producto en Euros',
    example: '{"price": 1.3}',
    required: false,
  })
  @ValidateNested()
  @Type(() => CreateProductPriceDto)
  price?: CreateProductPriceDto;
}
