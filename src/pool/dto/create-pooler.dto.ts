import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePoolerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  leagueId: string;
}
