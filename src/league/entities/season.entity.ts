import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rules } from './rules.entity';
import { League } from './league.entity';
import { Keepers } from 'src/pool/entities/keepers.entity';
import { PoolerTeam } from 'src/pool/entities/pooler-team.entity';

@Entity()
export class Season extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column({
    type: 'timestamptz',
    name: 'draft_day',
  })
  draftDay: Date;

  @Column({
    type: 'timestamptz',
    name: 'keepers_deadline',
  })
  keepersDeadline: Date;

  @Column({
    type: 'timestamptz',
    name: 'trade_deadline',
  })
  tradeDeadline: Date;

  @OneToMany(() => Keepers, (keepers) => keepers.season, {
    cascade: true,
  })
  keepers: Keepers[];

  @OneToMany(() => PoolerTeam, (poolerTeams) => poolerTeams.season, {
    cascade: true,
  })
  poolerTeams: PoolerTeam[];

  @ManyToOne(() => Rules, (rules) => rules.seasons, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  rules: Rules;

  @ManyToOne(() => League, (league) => league.seasons, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  league: League;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;
}
