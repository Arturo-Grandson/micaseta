import { Booth } from 'src/booth/entities/booth.entity';
import { Consumption } from 'src/consumption/entities/consumption.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductPrice } from './product-price.entity';

@Entity()
@Unique(['name', 'booth'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['drink', 'food'] })
  type: string;

  @ManyToOne(() => Booth, (b) => b.products, { nullable: false })
  booth: Booth;

  @Column()
  boothId: number;

  @OneToOne(() => ProductPrice, (pp) => pp.product)
  price: ProductPrice;

  @OneToMany(() => Consumption, (c) => c.product)
  consumptions: Consumption[];
}
