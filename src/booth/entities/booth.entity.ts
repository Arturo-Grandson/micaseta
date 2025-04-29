import { Consumption } from 'src/consumption/entities/consumption.entity';
import { Penalty } from 'src/penalty/entities/penalty.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoothMember } from './booth-member.entity';
import { CommonExpense } from 'src/expenses/entities/expenses.entity';
import { BoothRole } from './booth-role.entity';
import { CommonExpenseParticipant } from 'src/expenses/entities/expenses-participant.entity';
import { OptionalExpense } from 'src/expenses/entities/optional-expense.entity';
import { OptionalExpenseParticipant } from 'src/expenses/entities/optional-expense-participant.entity';

@Entity('booths')
export class Booth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  uuid: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Product, (p) => p.booth)
  products: Product[];

  @OneToMany(() => Consumption, (c) => c.booth)
  consumptions: Consumption[];

  @OneToMany(() => Penalty, (p) => p.booth)
  penalties: Penalty[];

  @OneToMany(() => CommonExpense, (ce) => ce.booth)
  commonExpenses: CommonExpense[];

  @OneToMany(() => OptionalExpense, (oe) => oe.booth)
  optionalExpenses: OptionalExpense[];

  @OneToMany(() => BoothRole, (r) => r.booth)
  boothRoles: BoothRole[];

  @OneToMany(() => BoothMember, (bm) => bm.booth)
  boothMemberships: BoothMember[];

  @OneToMany(() => CommonExpenseParticipant, (cep) => cep.booth)
  commonExpenseParticipants: CommonExpenseParticipant[];

  @OneToMany(() => OptionalExpenseParticipant, (oep) => oep.booth)
  optionalExpenseParticipants: OptionalExpenseParticipant[];
}
