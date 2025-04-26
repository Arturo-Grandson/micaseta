import { Booth } from "src/booth/entities/booth.entity";
import { Consumption } from "src/consumption/entities/consumption.entity";
import { ProductTypeEnum } from "src/enums/enums";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductPrice } from "./product-price.entity";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['drink', 'food'] })
  type: string;

  @ManyToOne(() => Booth, b => b.products)
  booth: Booth;

  @OneToMany(() => ProductPrice, pp => pp.product)
  prices: ProductPrice[];

  @OneToMany(() => Consumption, c => c.product)
  consumptions: Consumption[];
}