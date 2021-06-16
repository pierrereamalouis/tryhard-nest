import { IsString } from 'class-validator';

export class UpdatePoolerDto {
  @IsString()
  name: string;

  @IsString()
  leagueId: string;
}
