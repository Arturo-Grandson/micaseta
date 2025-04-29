import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { Penalty } from './entities/penalty.entity';

@ApiTags('Penalty')
@Controller('penalty')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una multa' })
  @ApiResponse({
    status: 201,
    description: 'Multa creada exitosamente',
  })
  async createPenalty(@Body() createPenaltyDto: CreatePenaltyDto) {
    return await this.penaltyService.createPenalty(createPenaltyDto);
  }

  //TODO: Eliminar la multa por el id del usuario, id de caseta, anio y festividad
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una multa' })
  @ApiResponse({
    status: 200,
    description: 'Multa eliminada exitosamente',
  })
  async deletePenaltyByUserId(@Param('id') id: number): Promise<Penalty> {
    return await this.penaltyService.deletePenaltyByUserId(id);
  }
}
