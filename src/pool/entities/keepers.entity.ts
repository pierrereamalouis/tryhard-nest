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
export class Keepers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'number_of_players',
  })
  numberOfPlayers: number;

  @ManyToOne(() => Season, (season) => season.keepers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @ManyToOne(() => Pooler, (pooler) => pooler.keepers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pooler_id' })
  pooler: Pooler;

  @ManyToMany(() => Player, (player) => player.keepers, {
    cascade: true,
  })
  @JoinTable({
    name: 'keepers_plyers',
    joinColumn: {
      name: 'keepers_id',
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
