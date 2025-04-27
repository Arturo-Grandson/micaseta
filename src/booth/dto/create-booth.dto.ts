import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";


export class CreateBoothDto {
  @ApiProperty({
    description: 'Nombre de la caseta',
    example: 'Los Chiflaos'
  })
  @IsString()
  @MinLength(3)
  name: string;
  
}