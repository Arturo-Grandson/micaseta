import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BoothAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    // Si no hay boothId en los parámetros, no hacemos validación adicional
    if (!params.boothId) {
      return true;
    }

    const requestedBoothId = parseInt(params.boothId, 10);

    // El boothId del token debe coincidir con el de la ruta
    if (user.boothId !== requestedBoothId) {
      throw new UnauthorizedException('No tienes acceso a esta caseta');
    }

    return true;
  }
}
