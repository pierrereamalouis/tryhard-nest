import { IsArray, IsDate, IsNotEmpty, Matches } from 'class-validator';
import { Keepers } from 'src/pool/entities/keepers.entity';
import { PoolerTeam } from 'src/pool/entities/pooler-team.entity';

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
  poolerTeams: PoolerTeam[];
}
