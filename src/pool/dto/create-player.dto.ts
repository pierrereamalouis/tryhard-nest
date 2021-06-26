import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsNumber()
  mySportsFeedsId: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  primaryPosition: string;

  @IsNotEmpty()
  @IsNumber()
  jerseyNumber: number;

  @IsNotEmpty()
  @IsString()
  nhlTeam: string;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsString()
  birthDate: string;

  @IsNumber()
  age: number;

  @IsString()
  birthCity: string;

  @IsString()
  birthCountry: string;

  @IsBoolean()
  isRookie: boolean;
}
