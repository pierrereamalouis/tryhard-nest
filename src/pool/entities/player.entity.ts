import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Keepers } from './keepers.entity';
import { PoolerTeam } from './pooler-team.entity';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'mySportsFeedsId',
    unique: true,
  })
  mySportsFeeds: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'primaryPosition',
  })
  position: string;

  @Column({
    type: 'varchar',
    length: 5,
    name: 'nhl_team',
  })
  nhlTeam: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'height',
  })
  height: string;

  @Column({
    type: 'integer',
    name: 'weight',
  })
  weight: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'birth_date',
  })
  birthDate: string;

  @Column({
    type: 'integer',
  })
  age: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'birth_city',
  })
  birthCity: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'birth_country',
  })
  birthCountry: string;

  @Column({
    type: 'boolean',
    name: 'is_rookie',
  })
  isRookie: boolean;

  @ManyToMany(() => PoolerTeam, (poolerTeam) => poolerTeam.players)
  poolerTeams: PoolerTeam[];

  @ManyToMany(() => Keepers, (keepers) => keepers.players)
  keepers: Keepers[];

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
