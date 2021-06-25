import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateKeepersDto } from './create-keepers.dto';

export class UpdateKeepersDto extends PartialType(CreateKeepersDto) {
  @IsNumber()
  numberOfPlayers: number;

  @IsString()
  seasonId: string;

  @IsString()
  poolerId: string;
}
