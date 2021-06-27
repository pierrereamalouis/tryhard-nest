import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsNumber()
  mySportsFeedsId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  primaryPosition: string;

  @IsString()
  nhlTeam: string;

  @IsString()
  height: string;

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
