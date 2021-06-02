import { Pooler } from 'src/pool/entities/pooler.entity';
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

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @OneToMany((type) => Pooler, (pooler) => pooler.league)
  poolers: Pooler;

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
