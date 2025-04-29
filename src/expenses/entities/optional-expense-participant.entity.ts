import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { OptionalExpense } from './optional-expense.entity';
import { Booth } from 'src/booth/entities/booth.entity';

@Entity()
export class OptionalExpenseParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OptionalExpense, (oe) => oe.participants)
  expense: OptionalExpense;

  @ManyToOne(() => User, (u) => u.optionalExpenseParticipants)
  user: User;

  @ManyToOne(() => Booth, (b) => b.optionalExpenseParticipants)
  booth: Booth;

  @Column({ default: 1 })
  guestCount: number;

  @Column({ default: false })
  hasGuests: boolean;

  @Column({ default: false })
  isCostCalculated: boolean;

  @Column('decimal', { nullable: true })
  assignedAmount: number;

  @Column('decimal', { nullable: true })
  totalAmount: number; // assignedAmount * (1 + guestCount)
}
