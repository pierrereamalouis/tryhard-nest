import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    name: 'position',
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
    type: 'varchar',
    length: 50,
    name: 'weight',
  })
  weight: string;

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
}
