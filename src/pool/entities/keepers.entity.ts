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
export class Keepers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'number_of_players',
  })
  numberOfPlayers: number;

  @ManyToOne(() => Season, (season) => season.keepers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  season: Season;

  @ManyToOne(() => Pooler, (pooler) => pooler.keepers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pooler: Pooler;

  @ManyToMany(() => Player)
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
