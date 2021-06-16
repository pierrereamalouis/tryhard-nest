import { IsString, IsNumber } from 'class-validator';

export class UpdatePoolerTeamDto {
  @IsString()
  name: string;

  @IsNumber()
  numberOfPlayers: number;

  @IsNumber()
  numberOfForwards: number;

  @IsNumber()
  numberOfDefensemen: number;

  @IsNumber()
  numberOfGoalies: number;

  @IsString()
  seasonId: string;

  @IsString()
  poolerId: string;
}
