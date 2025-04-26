import { Booth } from "src/booth/entities/booth.entity";
import { FestiveTypeEnum } from "src/enums/enums";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, u => u.penalties)
  user: User;

  @ManyToOne(() => Booth, b => b.penalties)
  booth: Booth;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festivalType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column('decimal')
  amount: number;

  @Column()
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}