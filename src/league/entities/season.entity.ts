import { type } from 'os';
import { Keepers } from 'src/pool/entities/keepers.entity';
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
export class Season extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  draftDay: Date;

  @Column()
  keepersDeadline: Date;

  @Column()
  tradeDeadline: Date;

  @OneToMany((type) => Keepers, (keepers) => keepers.season, {
    cascade: true,
  })
  keepers: Keepers[];

  @OneToMany((type) => PoolerTeams, (poolerTeams) => poolerTeams.season, {
    cascade: true,
  })
  poolerTeams: PoolerTeams[];

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
