import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePoolerTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfPlayers: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfForwards: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfDefensemen: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfGoalies: number;

  @IsNotEmpty()
  @IsString()
  seasonId: string;

  @IsNotEmpty()
  @IsString()
  poolerId: string;
}
