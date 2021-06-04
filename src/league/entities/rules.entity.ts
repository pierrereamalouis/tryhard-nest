import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Season } from './season.entity';

@Entity()
export class Rules extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'max_player_per_team',
  })
  maxPlayerPerTeam: number;

  @Column({
    type: 'integer',
    name: 'max_player_per_keepers',
  })
  maxPlayerPerKeepers: number;

  @Column({
    type: 'integer',
    name: 'minimum_goalie_per_team',
  })
  minimumGoaliePerTeam: number;

  @Column({
    type: 'integer',
    name: 'minimum_def_per_team',
  })
  minimumDefPerTeam: number;

  @Column({
    type: 'integer',
    name: 'points_per_goal',
  })
  pointsPerGoal: number;

  @Column({
    type: 'integer',
    name: 'points_per_assist',
  })
  pointsPerAssist: number;

  @Column({
    type: 'integer',
    name: 'points_per_win',
  })
  pointsPerWin: number;

  @Column({
    type: 'integer',
    name: 'points_per_shutout',
  })
  pointsPerShutout: number;

  @OneToMany((type) => Season, (season) => season.rules)
  seasons: Season[];

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
