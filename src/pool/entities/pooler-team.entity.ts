import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
  season: Season;

  @ManyToOne(() => Pooler, (pooler) => pooler.poolerTeams, {
    onDelete: 'CASCADE',
  })
  pooler: Pooler;

  @ManyToMany(() => Player, (player) => player.poolerTeams, {
    cascade: true,
  })
  @JoinTable()
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
