import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { ConsumptionService } from './consumption.service';
import { Consumption } from './entities/consumption.entity';

@ApiTags('consumption')
@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo consumo por usuario' })
  @ApiResponse({
    status: 201,
    description: 'Consumo creado exitosamente',
    type: Consumption,
  })
  async createConsumptionByUser(
    @Body() createConsumptionDto: CreateConsumptionDto,
  ) {
    return this.consumptionService.createConsumption(createConsumptionDto);
  }
}
