import { Pooler } from 'src/pool/entities/pooler.entity';
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
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'uuid',
    name: 'invitation_token',
  })
  invitationToken: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'boolean',
    name: 'is_used',
    default: false,
  })
  isUsed: boolean;

  @ManyToOne(() => League, (league) => league.invitations, {
    onDelete: 'CASCADE',
  })
  league: League;

  @ManyToOne(() => Pooler, (pooler) => pooler.invitations, {
    onDelete: 'CASCADE',
  })
  pooler: Pooler;
}
