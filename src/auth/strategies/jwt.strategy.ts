import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy - Validando token:', { payload });
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      console.log('JWT Strategy - Usuario no encontrado');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Si no hay boothId en el payload, devolver el usuario sin validación adicional
    if (!payload.boothId) {
      console.log(
        'JWT Strategy - No hay boothId en el payload, retornando usuario sin validación',
      );
      return user;
    }

    // Validar que el usuario tiene acceso a la caseta del token
    const hasAccess = user.boothMembers?.some(
      (member) => member.booth.id === payload.boothId,
    );

    console.log('JWT Strategy - Validación de acceso a caseta:', {
      userId: user.id,
      boothId: payload.boothId,
      hasAccess,
      userBooths: user.boothMembers?.map((m) => m.booth.id),
    });

    if (!hasAccess) {
      console.log('JWT Strategy - Usuario no tiene acceso a la caseta');
      throw new UnauthorizedException('No tienes acceso a esta caseta');
    }

    // Si llegamos aquí, el usuario tiene acceso a la caseta
    console.log('JWT Strategy - Acceso validado correctamente');
    return {
      ...user,
      boothId: payload.boothId,
    };
  }
}
