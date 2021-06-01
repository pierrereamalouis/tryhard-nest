import { Season } from 'src/league/entities/season.entity';
import {
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Keepers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberOfPlayers: number;

  @ManyToOne((type) => Season, (season) => season.keepers)
  season: Season;
}
