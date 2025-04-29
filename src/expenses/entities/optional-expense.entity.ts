import { Booth } from 'src/booth/entities/booth.entity';
import { FestiveTypeEnum } from 'src/enums/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OptionalExpenseParticipant } from './optional-expense-participant.entity';

@Entity()
export class OptionalExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booth, (b) => b.optionalExpenses)
  booth: Booth;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festiveType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column('decimal', { nullable: true })
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(() => OptionalExpenseParticipant, (oep) => oep.expense)
  participants: OptionalExpenseParticipant[];
}
