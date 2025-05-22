import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = uuidv4();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, body, headers, ip } = request;
    const userAgent = headers['user-agent'] || 'unknown';

    // No loguear información sensible como passwords
    const sanitizedBody = this.sanitizeBody(body);

    const startTime = Date.now();
    this.logger.log(
      `[${requestId}] Request: ${method} ${url} - IP: ${ip} - UserAgent: ${userAgent}`,
    );

    if (Object.keys(sanitizedBody).length > 0) {
      this.logger.debug(
        `[${requestId}] Request Body: ${JSON.stringify(sanitizedBody)}`,
      );
    }

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          const duration = Date.now() - startTime;
          response.setHeader('X-Request-Id', requestId);

          // Sanitizar respuesta para no logear datos sensibles
          const sanitizedResponse = this.sanitizeResponse(data);

          this.logger.log(
            `[${requestId}] Response: ${method} ${url} - ${response.statusCode} - ${duration}ms`,
          );

          if (sanitizedResponse) {
            this.logger.debug(
              `[${requestId}] Response Body: ${JSON.stringify(sanitizedResponse)}`,
            );
          }
        },
        error: (error: any) => {
          const duration = Date.now() - startTime;
          response.setHeader('X-Request-Id', requestId);

          this.logger.error(
            `[${requestId}] Error: ${method} ${url} - ${error.status || 500} - ${duration}ms - ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return {};

    const sanitized = { ...body };

    // Remover campos sensibles
    const sensitiveFields = ['password', 'token', 'refresh_token', 'secret'];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  private sanitizeResponse(data: any): any {
    if (!data) return null;

    if (typeof data === 'object') {
      const sanitized = { ...data };

      // Redactar campos sensibles de la respuesta
      if (sanitized.token) sanitized.token = '[REDACTED]';
      if (sanitized.access_token) sanitized.access_token = '[REDACTED]';
      if (sanitized.refresh_token) sanitized.refresh_token = '[REDACTED]';

      return sanitized;
    }

    return data;
  }
}
