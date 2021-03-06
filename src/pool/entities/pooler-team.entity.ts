import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pooler } from './pooler.entity';
import { Season } from 'src/league/entities/season.entity';
import { Player } from './player.entity';
@Entity()
export class PoolerTeam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'integer',
    name: 'number_of_players',
  })
  numberOfPlayers: number;

  @Column({
    type: 'integer',
    name: 'number_of_forwards',
  })
  numberOfForwards: number;

  @Column({
    type: 'integer',
    name: 'number_of_defensemen',
  })
  numberOfDefensemen: number;

  @Column({
    type: 'integer',
    name: 'number_of_goalies',
  })
  numberOfGoalies: number;

  @ManyToOne(() => Season, (season) => season.poolerTeams, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @ManyToOne(() => Pooler, (pooler) => pooler.poolerTeams, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pooler_id' })
  pooler: Pooler;

  @ManyToMany(() => Player, (player) => player.poolerTeams, {
    cascade: true,
  })
  @JoinTable({
    name: 'pooler_team_players',
    joinColumn: {
      name: 'pooler_team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'player_id',
      referencedColumnName: 'id',
    },
  })
  players: Player[];

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
