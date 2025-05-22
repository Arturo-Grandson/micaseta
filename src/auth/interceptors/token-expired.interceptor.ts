import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenExpiredInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        // Verificar si el token está cerca de expirar (menos de 10 minutos)
        const payload = this.jwtService.decode(token);
        if (payload && typeof payload === 'object' && payload.exp) {
          const expirationTime = payload.exp * 1000; // Convertir a milisegundos
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;

          // Si el token expira en menos de 10 minutos, agregar una cabecera
          if (timeUntilExpiration > 0 && timeUntilExpiration < 10 * 60 * 1000) {
            const response = context.switchToHttp().getResponse();

            // Generar nuevo token
            const newToken = this.jwtService.sign(
              { email: payload.email, sub: payload.sub },
              {
                secret: this.configService.get('jwt.secret'),
                expiresIn: this.configService.get('jwt.expiresIn'),
              },
            );

            // Agregar el token a la respuesta
            response.header('X-New-Token', newToken);
          }
        }
      } catch (error) {
        // Si hay un error al decodificar el token, dejar que la petición continúe
        // El guard de autenticación se encargará de manejar este caso
      }
    }

    return next.handle();
  }
}
