import { Matches, IsDate, IsArray, IsString } from 'class-validator';

export class UpdateSeasonDto {
  @Matches(/^\d{4}-\d{4}$/)
  @IsString()
  year: string;

  @IsString()
  draftDay: string;

  @IsString()
  keepersDeadline: string;

  @IsString()
  tradeDeadline: string;

  @IsString()
  leagueId: string;
}
