import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateRulesDto } from './create-rules.dto';

export class UpdateRulesDto extends PartialType(CreateRulesDto) {
  @IsString()
  name: string;

  @IsNumber()
  maxPlayerPerTeam: number;

  @IsNumber()
  maxPlayerPerKeepers: number;

  @IsNumber()
  minimumGoaliePerTeam: number;

  @IsNumber()
  minimumDefPerTeam: number;

  @IsNumber()
  pointsPerGoal: number;

  @IsNumber()
  pointsPerAssist: number;

  @IsNumber()
  pointsPerWin: number;

  @IsNumber()
  pointsPerShutout: number;
}
