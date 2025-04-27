import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Booth } from "./booth.entity";

@Entity()
@Unique(['user', 'booth'])
export class BoothMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  uuid: string;

  @ManyToOne(() => User, (user) => user.boothMembers)
  user: User;
  
  @ManyToOne(() => Booth, (booth) => booth.boothMemberships)
  booth: Booth;
    
}