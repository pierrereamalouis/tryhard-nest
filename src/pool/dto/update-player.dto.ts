import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  position: string;

  @IsNumber()
  jerseyNumber: number;

  @IsString()
  nhlTeam: string;

  @IsString()
  height: string;

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
