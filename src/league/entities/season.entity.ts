import { type } from 'os';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @OneToMany((type) => Keepers, (keepers) => keepers.season)
  keepers: Keepers[];
}
