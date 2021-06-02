import { Season } from 'src/league/entities/season.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export class Keepers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberOfPlayers: number;

  @ManyToOne((type) => Season, (season) => season.keepers)
  season: Season;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Timestamp;
}
