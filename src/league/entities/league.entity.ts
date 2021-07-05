import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Season } from './season.entity';
import { Pooler } from 'src/pool/entities/pooler.entity';
import { Invitation } from './invitation.entity';

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @ManyToMany(() => Pooler, (pooler) => pooler.leagues, {
    cascade: true,
  })
  @JoinTable({
    name: 'league_poolers',
    joinColumn: {
      name: 'league_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pooler_id',
      referencedColumnName: 'id',
    },
  })
  poolers: Pooler[];

  @OneToMany(() => Season, (season) => season.league, {
    cascade: true,
  })
  seasons: Season[];

  @OneToMany(() => Invitation, (invitation) => invitation.league, {
    cascade: true,
  })
  invitations: Invitation[];

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
