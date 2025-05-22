import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoothModule } from './booth/booth.module';
import { ConsumptionModule } from './consumption/consumption.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PenaltyModule } from './penalty/penalty.module';
import { ProductModule } from './product/product.module';
import { AppConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AppConfigModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host', 'localhost'),
        port: configService.get('database.port', 5432),
        username: configService.get('database.username', 'postgres'),
        password: configService.get('database.password', 'mysecretpassword'),
        database: configService.get('database.database', 'postgres'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize', false),
      }),
    }),
    UsersModule,
    AuthModule,
    BoothModule,
    ConsumptionModule,
    ExpensesModule,
    PenaltyModule,
    ProductModule,
  ],
})
export class AppModule {}
