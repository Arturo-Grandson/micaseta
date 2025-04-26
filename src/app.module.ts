import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoothModule } from './booth/booth.module';
import { ConsumptionModule } from './consumption/consumption.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PenaltyModule } from './penalty/penalty.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'mysecretpassword',
      database: process.env.DB_DATABASE || 'my_booth',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // En producción debe ser false
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
