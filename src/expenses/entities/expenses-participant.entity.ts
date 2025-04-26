import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { CommonExpense } from "./expenses.entity";

@Entity()
export class CommonExpenseParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CommonExpense, ce => ce.participants)
  expense: CommonExpense;

  @ManyToOne(() => User, u => u.commonExpenseParticipants)
  user: User;

  @Column('decimal', { nullable: true })
  assignedAmount: number;
}