import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePoolerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  leagueId: string;
}
