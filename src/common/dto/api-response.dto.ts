import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operación completada con éxito' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: {} })
  data?: T;

  @ApiProperty({ example: '2025-05-22T07:47:42.000Z' })
  timestamp: string;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Error al procesar la solicitud' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'BadRequestException' })
  error: string;

  @ApiProperty({ example: '/api/users/1' })
  path: string;

  @ApiProperty({ example: '2025-05-22T07:47:42.000Z' })
  timestamp: string;
}
