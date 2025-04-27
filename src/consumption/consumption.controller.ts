import { Controller, Get, Param } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { FestiveTypeEnum } from '@/enums/enums';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Get('user/:userId/booth/:boothId/year/:year/festivalType/:festivalType')
  async getAllConsumptionsAndPricesByUserIdAndBoothId(
    @Param('userId') userId: number,
    @Param('boothId') boothId: number,
    @Param('year') year: number,
    @Param('festivalType') festivalType: FestiveTypeEnum
  ) {
    return this.consumptionService.getAllConsumptionsAndPricesByUserIdAndBoothId(userId, boothId, year, festivalType);
  }
}
