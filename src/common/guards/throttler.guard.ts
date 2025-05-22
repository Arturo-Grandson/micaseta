import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  // Puedes personalizar el comportamiento del ThrottlerGuard aquí
  // Por ejemplo, excluir ciertas rutas, o aplicar diferentes límites basados en el usuario

  protected getTracker(req: Record<string, any>): Promise<string> {
    // Usa la IP como identificador para el rate limiting
    // También puedes usar req.user?.id si quieres aplicar límites por usuario
    return Promise.resolve(req.ip);
  }
}
