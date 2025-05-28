import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokensService } from './services/tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    // Si el usuario no tiene casetas asignadas, esto es un error
    if (!user.boothMembers || user.boothMembers.length === 0) {
      throw new UnauthorizedException('El usuario no tiene casetas asignadas');
    }

    // Verificar si el usuario tiene casetas asignadas
    if (!user.boothMembers || user.boothMembers.length === 0) {
      throw new UnauthorizedException('El usuario no tiene casetas asignadas');
    }

    // Si no se proporcionó boothId, devolver la lista de casetas disponibles
    if (!loginDto.boothId) {
      // Crear los tokens incluso cuando se necesita seleccionar caseta
      const payload = {
        email: user.email,
        sub: user.id,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshTokenEntity =
        await this.tokensService.createRefreshToken(user);

      throw new UnauthorizedException({
        message: 'Por favor, selecciona una caseta para continuar',
        booths: user.boothMembers.map((member) => ({
          id: member.booth.id,
          name: member.booth.name,
        })),
        access_token: accessToken,
        refresh_token: refreshTokenEntity.token,
        user: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        },
      });
    }

    // Verificar que el usuario tenga acceso a la caseta seleccionada
    const hasBooth = user.boothMembers.some(
      (member) => member.booth.id === loginDto.boothId,
    );

    if (!hasBooth) {
      throw new UnauthorizedException({
        message: 'No tienes acceso a esta caseta. Por favor, selecciona otra.',
        booths: user.boothMembers.map((member) => ({
          id: member.booth.id,
          name: member.booth.name,
        })),
      });
    }

    return user;
  }

  async login(user: any, loginDto: LoginDto) {
    const payload = {
      email: user.email,
      sub: user.id,
      boothId: loginDto.boothId,
      roles: user.roles,
    };

    // Crear un access token
    const accessToken = this.jwtService.sign(payload);

    // Crear un refresh token
    const refreshTokenEntity =
      await this.tokensService.createRefreshToken(user);

    return {
      access_token: accessToken,
      refresh_token: refreshTokenEntity.token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        boothId: loginDto.boothId,
      },
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    // Verificar si el token existe y es válido
    const tokenEntity = await this.tokensService.findTokenByValue(refreshToken);

    if (!tokenEntity) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Verificar si el token ha expirado
    if (new Date() > tokenEntity.expiresAt) {
      await this.tokensService.revokeToken(tokenEntity.id);
      throw new UnauthorizedException('Refresh token expirado');
    }

    // Generar un nuevo access token
    const accessToken = this.tokensService.createAccessToken(tokenEntity.user);

    return {
      access_token: accessToken,
    };
  }

  async logout(userId: number) {
    await this.tokensService.revokeAllUserTokens(userId);
    return { message: 'Sesión cerrada correctamente' };
  }
}
