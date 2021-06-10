import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSeasonDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{4}$/)
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  draftDay: string;

  @IsNotEmpty()
  @IsString()
  keepersDeadline: string;

  @IsNotEmpty()
  @IsString()
  tradeDeadline: string;

  @IsNotEmpty()
  @IsString()
  leagueId: string;

  @IsNotEmpty()
  @IsString()
  rulesId: string;
}
