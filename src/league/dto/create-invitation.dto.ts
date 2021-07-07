import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsString()
  leagueId: string;

  @IsNotEmpty()
  @IsString()
  poolerId: string;
}
