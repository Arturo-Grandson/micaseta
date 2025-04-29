import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateProductPriceDto } from './create-product.dto';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Precio del producto en Euros',
    example: '{"price": 1.3}',
  })
  @ValidateNested()
  @Type(() => CreateProductPriceDto)
  price: CreateProductPriceDto;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'cerveza',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
