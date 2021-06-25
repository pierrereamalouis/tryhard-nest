import { PartialType } from '@nestjs/mapped-types';
import { Matches, IsDate, IsArray, IsString } from 'class-validator';
import { CreateSeasonDto } from './create-season.dto';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
  @Matches(/^\d{4}-\d{4}$/)
  @IsString()
  year: string;

  @IsString()
  draftDay: string;

  @IsString()
  keepersDeadline: string;

  @IsString()
  tradeDeadline: string;

  @IsString()
  leagueId: string;

  @IsString()
  rulesId: string;
}
