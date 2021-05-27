import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLeagueDto } from '../dto/create-league.dto';
import { UpdateLeagueDto } from '../dto/update-league.dto';
import { League } from '../entities/league.entity';
import { LeagueService } from '../services/league.service';

@Controller('leagues')
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

  @Delete('/:id')
  deleteLeague(@Param('id') id: string): Promise<void> {
    return this.leagueService.deleteLeague(id);
  }

  @Patch('/:id')
  updateLeague(
    @Param('id') id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ): Promise<League> {
    return this.leagueService.updateLeague(id, updateLeagueDto);
  }
}
