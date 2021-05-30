import { IsArray, IsDate, IsNotEmpty, Matches } from 'class-validator';

export class CreateSeasonDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{4}$/)
  year: string;

  @IsNotEmpty()
  @IsDate()
  draftDay: Date;

  @IsNotEmpty()
  @IsDate()
  keepersDeadline: Date;

  @IsNotEmpty()
  @IsDate()
  tradeDeadline: Date;

  @IsArray()
  keepers: Keepers[];

  @IsArray()
  poolerTeams: PoolerTeams[];
}
