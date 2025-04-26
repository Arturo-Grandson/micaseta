import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Booth } from "./booth.entity";
import { BoothRoleTypeEnum, FestiveTypeEnum } from "src/enums/enums";



@Entity()
export class BoothRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, u => u.boothRoles)
  user: User;

  @ManyToOne(() => Booth, b => b.boothRoles)
  booth: Booth;

  @Column({ type: 'enum', enum: FestiveTypeEnum })
  festivalType: FestiveTypeEnum;

  @Column()
  year: number;

  @Column({ type: 'enum', enum: BoothRoleTypeEnum })
  role: BoothRoleTypeEnum;
}