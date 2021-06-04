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
import { Keepers } from './keepers.entity';
import { League } from 'src/league/entities/league.entity';
import { PoolerTeam } from './pooler-team.entity';
@Entity()
export class Pooler extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @ManyToOne((type) => League, (league) => league.poolers, {
    onDelete: 'CASCADE',
  })
  league: League;

  @OneToMany((type) => Keepers, (keepers) => keepers.pooler, {
    cascade: true,
  })
  keepers: Keepers[];

  @OneToMany((type) => PoolerTeam, (poolerTeams) => poolerTeams.pooler, {
    cascade: true,
  })
  poolerTeams: PoolerTeam[];

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
