import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rules extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'max_player_per_team',
  })
  maxNumPlayerPerTeam: number;

  @Column({
    type: 'integer',
    name: 'max_player_per_keepers',
  })
  maxPlayerPerKeepers: number;
}
