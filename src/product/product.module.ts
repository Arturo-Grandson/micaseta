import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductPrice } from './entities/product-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPrice])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
