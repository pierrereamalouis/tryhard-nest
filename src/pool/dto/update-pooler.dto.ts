import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreatePoolerDto } from './create-pooler.dto';

export class UpdatePoolerDto extends PartialType(CreatePoolerDto) {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  leagueId: string;
}
