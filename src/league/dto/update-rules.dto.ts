import { IsString, IsNumber } from 'class-validator';

export class UpdateRulesDto {
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
