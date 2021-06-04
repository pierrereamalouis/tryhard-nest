import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Season } from './season.entity';
import { Pooler } from 'src/pool/entities/pooler.entity';

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @OneToMany((type) => Pooler, (pooler) => pooler.league, {
    cascade: true,
  })
  poolers: Pooler[];

  @OneToMany((type) => Season, (season) => season.league, {
    cascade: true,
  })
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
