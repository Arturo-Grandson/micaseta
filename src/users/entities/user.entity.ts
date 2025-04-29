import { BoothMember } from '@/booth/entities/booth-member.entity';
import { BoothRole } from '@/booth/entities/booth-role.entity';
import { Consumption } from '@/consumption/entities/consumption.entity';
import { CommonExpenseParticipant } from '@/expenses/entities/expenses-participant.entity';
import { OptionalExpenseParticipant } from '@/expenses/entities/optional-expense-participant.entity';
import { Penalty } from '@/penalty/entities/penalty.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  uuid: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Consumption, (consumption) => consumption.user)
  consumptions: Consumption[];

  @OneToMany(() => Penalty, (penalty) => penalty.user)
  penalties: Penalty[];

  @OneToMany(() => BoothRole, (boothRole) => boothRole.user)
  boothRoles: BoothRole[];

  @OneToMany(() => BoothMember, (boothMember) => boothMember.user)
  boothMembers: BoothMember[];

  @OneToMany(() => CommonExpenseParticipant, (cep) => cep.user)
  commonExpenseParticipants: CommonExpenseParticipant[];

  @OneToMany(() => OptionalExpenseParticipant, (oep) => oep.user)
  optionalExpenseParticipants: OptionalExpenseParticipant[];
}
