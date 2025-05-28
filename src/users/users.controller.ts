import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SelectBoothDto } from './dto/select-booth.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'El email ya está registrado',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/booth/:boothId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuarios de una caseta específica' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios de la caseta',
    type: [User],
  })
  async findUsersByBoothId(@Param('boothId') boothId: number) {
    return this.usersService.findUsersByBoothId(boothId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('me/booths')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener las casetas del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Lista de casetas del usuario',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getUserBooths(@Request() req) {
    return this.usersService.getUserBooths(req.user.id);
  }

  @Post('booth/select')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Seleccionar una caseta para el usuario' })
  @ApiResponse({
    status: 200,
    description: 'Caseta seleccionada exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - El usuario no tiene acceso a esta caseta',
  })
  async selectBooth(@Request() req, @Body() selectBoothDto: SelectBoothDto) {
    return this.usersService.selectBooth(req.user.id, selectBoothDto.boothId);
  }
}
