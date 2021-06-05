import { IsNotEmpty, Matches, IsDate, IsArray } from 'class-validator';
import { Keepers } from 'src/pool/entities/keepers.entity';
import { PoolerTeam } from 'src/pool/entities/pooler-team.entity';
import { League } from '../entities/league.entity';

export class UpdateSeasonDto {
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

  @IsNotEmpty()
  league: League;

  @IsArray()
  keepers: Keepers[];

  @IsArray()
  poolerTeams: PoolerTeam[];
}
