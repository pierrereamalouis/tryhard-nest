import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateKeepersDto {
  @IsNotEmpty()
  @IsNumber()
  numberOfPlayers: number;

  @IsNotEmpty()
  @IsString()
  seasonId: string;

  @IsNotEmpty()
  @IsString()
  poolerId: string;
}
