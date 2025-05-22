import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppThrottlerGuard } from './guards/throttler.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
  ],
})
export class CommonModule {}
