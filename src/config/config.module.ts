import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { jwtConfig } from './jwt.config';
import { appConfig } from './app.config';
import throttlerConfig from './throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, appConfig, throttlerConfig],
      envFilePath: '.env',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: configService.get('throttler.ttl', 60),
            limit: configService.get('throttler.limit', 10),
          },
        ],
      }),
    }),
  ],
  exports: [ConfigModule, ThrottlerModule],
})
export class AppConfigModule {}
