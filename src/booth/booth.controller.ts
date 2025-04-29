import { Body, Controller, Post } from '@nestjs/common';
import { BoothService } from './booth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoothDto } from './dto/create-booth.dto';

@ApiTags('booths')
@Controller('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva caseta' })
  @ApiResponse({ status: 201, description: 'Caseta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createBooth(@Body() createBoothDto: CreateBoothDto) {
    return this.boothService.createBooth(createBoothDto);
  }
}
