import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  position: string;

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
  @IsString()
  weight: string;

  @IsString()
  birthDate: string;

  @IsNumber()
  age: number;

  @IsNumber()
  birthCity: number;

  @IsString()
  birthCountry: string;

  @IsBoolean()
  isRookie: boolean;
}
