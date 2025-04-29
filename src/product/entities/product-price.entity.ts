import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (p) => p.price)
  @JoinColumn()
  product: Product;

  @Column('decimal')
  price: number;
}
