import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Product } from "./product.entity";
import { FestiveTypeEnum } from "src/enums/enums";


@Entity()
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, p => p.prices)
  product: Product;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festivalType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column('decimal')
  price: number;
}