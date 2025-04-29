import { Booth } from 'src/booth/entities/booth.entity';
import { FestiveTypeEnum } from 'src/enums/enums';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonExpenseParticipant } from './expenses-participant.entity';

@Entity()
export class CommonExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booth, (b) => b.commonExpenses)
  booth: Booth;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festiveType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column('decimal')
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(() => CommonExpenseParticipant, (cep) => cep.expense)
  participants: CommonExpenseParticipant[];
}
