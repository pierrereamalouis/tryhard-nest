import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLeagueDto } from '../dto/create-league.dto';
import { League } from '../entities/league.entity';
import { LeagueService } from '../services/league.service';

@Controller('league')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Get('/:id')
  getLeagueById(@Param('id', ParseIntPipe) id: number): Promise<League> {
    return this.leagueService.getLeagueById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLeague(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueService.createLeague(createLeagueDto);
  }
}
