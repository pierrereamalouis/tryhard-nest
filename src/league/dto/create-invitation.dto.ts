import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsNumber()
  leagueId: number;

  @IsNotEmpty()
  @IsNumber()
  poolerId: number;
}
