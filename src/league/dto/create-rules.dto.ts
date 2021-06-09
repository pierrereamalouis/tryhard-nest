import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Season } from '../entities/season.entity';

export class CreateRulesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  maxPlayerPerTeam: number;

  @IsNotEmpty()
  @IsNumber()
  maxPlayerPerKeepers: number;

  @IsNotEmpty()
  @IsNumber()
  minimumGoaliePerTeam: number;

  @IsNotEmpty()
  @IsNumber()
  minimumDefPerTeam: number;

  @IsNotEmpty()
  @IsNumber()
  pointsPerGoal: number;

  @IsNotEmpty()
  @IsNumber()
  pointsPerAssist: number;

  @IsNotEmpty()
  @IsNumber()
  pointsPerWin: number;

  @IsNotEmpty()
  @IsNumber()
  pointsPerShutout: number;
}
