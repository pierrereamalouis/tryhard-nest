import { IsNotEmpty } from 'class-validator';

export class UpdateLeagueDto {
  @IsNotEmpty()
  name: string;
}
