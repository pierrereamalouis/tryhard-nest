import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from './league.entity';

@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'invitation_token',
  })
  @Generated('uuid')
  invitationToken: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    name: 'is_used',
    default: false,
  })
  isUsed: boolean;

  @ManyToOne(() => League, (league) => league.invitations)
  league: League;
}
