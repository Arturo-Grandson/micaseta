import { Booth } from 'src/booth/entities/booth.entity';
import { FestiveTypeEnum } from 'src/enums/enums';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.consumptions)
  user: User;

  @ManyToOne(() => Product, (p) => p.consumptions)
  product: Product;

  @ManyToOne(() => Booth, (b) => b.consumptions)
  booth: Booth;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festiveType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp' })
  date: Date;
}
