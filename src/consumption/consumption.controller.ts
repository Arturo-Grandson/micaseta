import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { ConsumptionService } from './consumption.service';

@ApiTags('consumption')
@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  async createConsumptionByUser(
    @Body() createConsumptionDto: CreateConsumptionDto,
  ) {
    return this.consumptionService.createConsumption(createConsumptionDto);
  }
}
