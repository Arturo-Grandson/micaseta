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
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    // Crear un access token
    const accessToken = this.jwtService.sign(payload);

    // Crear un refresh token
    const refreshTokenEntity =
      await this.tokensService.createRefreshToken(user);

    // Obtener el boothId del primer booth al que pertenece el usuario
    const boothId = user.boothMembers?.[0]?.booth?.id;

    return {
      access_token: accessToken,
      refresh_token: refreshTokenEntity.token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        boothId: boothId || null,
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
