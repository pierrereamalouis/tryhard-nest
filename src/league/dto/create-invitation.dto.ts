import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  leagueId: string;
}
