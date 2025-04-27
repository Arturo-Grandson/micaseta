import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Consumption } from './entities/consumption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FestiveTypeEnum } from '@/enums/enums';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private consumptionRepo: Repository<Consumption>
  ){}


  async getAllConsumptionsAndPricesByUserIdAndBoothId(
    userId: number, 
    boothId: number, 
    year: number, 
    festiveType: FestiveTypeEnum
  ){
    const consumptions = await this.consumptionRepo.find({
      where: {
        user: { id: userId },
        booth: { id: boothId },
        year: year,
        festivalType: festiveType
      },
      relations: ['product', 'product.prices']
    });

    // Agrupar por producto
    const summary: Record<string, { productName: string, quantity: number, price: number }> = {};

    for (const consumption of consumptions) {
      const productName = consumption.product.name;
      // Log para depuración
      console.log('Precios del producto', productName, consumption.product.prices);

      const priceObj = consumption.product.prices.find(
        p => String(p.festivalType) === String(festiveType) && Number(p.year) === Number(year)
      );
      console.log('Comparando:', priceObj, festiveType, year);

      const unitPrice = priceObj ? priceObj.price : 0;
      if (!summary[productName]) {
        summary[productName] = {
          productName,
          quantity: 0,
          price: 0
        };
      }
      summary[productName].quantity += consumption.quantity;
      summary[productName].price += unitPrice * consumption.quantity;
    }

    // Redondear los precios a dos decimales
    const result = Object.values(summary).map(item => ({
      ...item,
      price: Number(item.price.toFixed(2))
    }));
    return result;
  }
}
