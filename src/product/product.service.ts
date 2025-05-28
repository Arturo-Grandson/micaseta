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
    console.log('=== Iniciando búsqueda de productos ===');
    console.log('Caseta solicitada:', boothId);
    console.log('Tipo de boothId:', typeof boothId);

    // Asegurar que boothId es un número
    const boothIdNumber = Number(boothId);
    if (isNaN(boothIdNumber)) {
      throw new Error(`BoothId inválido: ${boothId}`);
    }

    // Usar una consulta más específica con QueryBuilder
    const products = await this.productRepo
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.booth', 'booth')
      .leftJoinAndSelect('product.price', 'price')
      .where('booth.id = :boothId', { boothId: boothIdNumber })
      .orderBy('product.name', 'ASC')
      .getMany();

    console.log(
      'Query SQL generada:',
      this.productRepo
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.booth', 'booth')
        .leftJoinAndSelect('product.price', 'price')
        .where('booth.id = :boothId', { boothId: boothIdNumber })
        .getSql(),
    );

    console.log('Productos encontrados:', JSON.stringify(products, null, 2));
    console.log('Cantidad de productos:', products.length);

    if (products.length === 0) {
      console.log('No se encontraron productos para la caseta:', boothId);
      return [];
    }

    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    console.log(
      'Creando producto con datos:',
      JSON.stringify(createProductDto, null, 2),
    );
    const { name, type, boothId, price } = createProductDto;

    // Verificar que la caseta existe
    const product = await this.productRepo
      .createQueryBuilder('product')
      .where('product.name = :name', { name })
      .andWhere('product.booth.id = :boothId', { boothId })
      .getOne();

    if (product) {
      throw new ConflictException(
        `Ya existe un producto con el nombre '${name}' en esta caseta`,
      );
    }

    // Crear el producto
    const newProduct = this.productRepo.create({
      name,
      type,
      booth: { id: boothId },
      boothId: boothId, // Asegurarnos de que se establece el boothId directamente
    });

    console.log('Guardando producto:', JSON.stringify(newProduct, null, 2));
    const savedProduct = await this.productRepo.save(newProduct);
    console.log('Producto guardado:', JSON.stringify(savedProduct, null, 2));

    // Crear el precio
    const productPrice = this.productPriceRepo.create({
      price: Number(price.price),
      product: savedProduct,
    });

    console.log('Guardando precio:', JSON.stringify(productPrice, null, 2));
    await this.productPriceRepo.save(productPrice);

    // Retornar el producto con el precio
    const productWithPrice = await this.productRepo.findOne({
      where: { id: savedProduct.id },
      relations: ['price', 'booth'],
    });

    console.log(
      'Producto final con precio:',
      JSON.stringify(productWithPrice, null, 2),
    );
    return productWithPrice;
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
