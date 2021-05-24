import { IsNotEmpty } from 'class-validator';

export class CreateLeagueDto {
  @IsNotEmpty()
  name: string;
}
