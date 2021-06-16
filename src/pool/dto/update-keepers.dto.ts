import { IsNumber, IsString } from 'class-validator';

export class UpdateKeepersDto {
  @IsNumber()
  numberOfPlayers: number;

  @IsString()
  seasonId: string;

  @IsString()
  poolerId: string;
}
