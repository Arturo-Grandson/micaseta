import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductPrice } from './entities/product-price.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(ProductPrice)
    private productPriceRepo: Repository<ProductPrice>,
  ) {}

  async findAllProductsByBoothId(boothId: number): Promise<Product[]> {
    const products = await this.productRepo.find({
      where: {
        booth: { id: boothId },
      },
      relations: ['price'],
    });

    if (products.length === 0) {
      throw new NotFoundException('No se encontraron productos en esta caseta');
    }

    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { name, type, boothId, price } = createProductDto;

    console.log('Valor de price recibido:', price, typeof price);

    const existingProduct = await this.productRepo.findOne({
      where: {
        name,
        booth: { id: boothId },
      },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Ya existe un producto con el nombre '${name}' en esta caseta`,
      );
    }

    const product = this.productRepo.create({
      name,
      type,
      booth: { id: boothId },
    });

    const savedProduct = await this.productRepo.save(product);

    const productPrice = this.productPriceRepo.create({
      price: Number(price.price),
      product: savedProduct,
    });

    await this.productPriceRepo.save(productPrice);

    return savedProduct;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const { name, price } = updateProductDto;

    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['price'],
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (name) {
      product.name = name;
    }
    if (price) {
      if (product.price) {
        product.price.price = Number(price.price);
        await this.productPriceRepo.save(product.price);
      } else {
        const productPrice = this.productPriceRepo.create({
          price: Number(price.price),
          product: product,
        });
        await this.productPriceRepo.save(productPrice);
      }
    }

    await this.productRepo.save(product);

    return product;
  }
}
