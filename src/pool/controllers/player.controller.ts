import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';

@Controller('players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get('mysportsfeeds')
  getMySportsFeeds(): Promise<any> {
    return this.playerService.getPlayersFromMySportsFeeds();
  }

  @Get('free-agents')
  getFreeAgents(
    @Body('seasonId', ParseIntPipe) seasonId: number,
  ): Promise<any> {
    return this.playerService.getSeasonFAPlayers(seasonId);
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.playerService.deletePlayer(id);
  }
}
