import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pooler } from './pooler.entity';
import { Season } from 'src/league/entities/season.entity';
import { Player } from './player.entity';

export class Keepers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'number_of_players',
  })
  numberOfPlayers: number;

  @ManyToOne((type) => Season, (season) => season.keepers)
  season: Season;

  @ManyToOne((type) => Pooler, (pooler) => pooler.keepers, {
    onDelete: 'CASCADE',
  })
  pooler: Pooler;

  @ManyToMany((type) => Player)
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
