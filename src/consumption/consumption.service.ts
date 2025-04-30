import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Consumption } from './entities/consumption.entity';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Booth } from '../booth/entities/booth.entity';
import { FestiveTypeEnum } from '../enums/enums';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private consumptionRepo: Repository<Consumption>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Booth)
    private boothRepo: Repository<Booth>,
  ) {}

  async createConsumption(createConsumptionDto: CreateConsumptionDto) {
    const { userId, boothId, festiveType, year, items } = createConsumptionDto;

    // Verificar que el usuario existe
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar que la caseta existe
    const booth = await this.boothRepo.findOne({
      where: { id: boothId },
    });
    if (!booth) {
      throw new NotFoundException('Caseta no encontrada');
    }

    // Verificar que todos los productos existen y pertenecen a la caseta
    const productIds = items.map((item) => item.productId);
    const products = await this.productRepo.find({
      where: {
        id: In(productIds),
        booth: { id: boothId },
      },
      relations: ['price'],
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException(
        'Uno o más productos no existen o no pertenecen a esta caseta',
      );
    }

    // Crear las consumiciones
    const consumptions = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return this.consumptionRepo.create({
        user: { id: userId },
        product: { id: product.id },
        booth: { id: boothId },
        festiveType: festiveType as FestiveTypeEnum,
        year,
        quantity: item.quantity,
        date: new Date(),
      });
    });

    // Guardar todas las consumiciones
    const savedConsumptions = await this.consumptionRepo.save(consumptions);

    return savedConsumptions;
  }

  async getConsumptionsByUserIdAndBoothId(userId: number, boothId: number) {
    const consumptions = await this.consumptionRepo.find({
      where: {
        user: { id: userId },
        booth: { id: boothId },
        year: new Date().getFullYear(),
      },
      relations: ['product.price'],
    });

    return consumptions;
  }
}
