import { IsEmail, IsString } from 'class-validator';

export class UpdatePoolerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  leagueId: string;
}
