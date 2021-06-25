import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreatePoolerTeamDto } from './create-pooler-team.dto';

export class UpdatePoolerTeamDto extends PartialType(CreatePoolerTeamDto) {
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
