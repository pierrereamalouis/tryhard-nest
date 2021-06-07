import { IsArray, IsDate, IsNotEmpty, Matches } from 'class-validator';
import { League } from '../entities/league.entity';

export class CreateSeasonDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{4}$/)
  year: string;

  @IsNotEmpty()
  @IsDate()
  draftDay: string;

  @IsNotEmpty()
  @IsDate()
  keepersDeadline: string;

  @IsNotEmpty()
  @IsDate()
  tradeDeadline: string;

  @IsNotEmpty()
  leagueId: string;

  league: League;
}
