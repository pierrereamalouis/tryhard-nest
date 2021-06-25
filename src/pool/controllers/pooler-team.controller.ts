import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { CreatePoolerTeamDto } from '../dto/create-pooler-team.dto';
import { UpdatePoolerTeamDto } from '../dto/update-pooler-team.dto';
import { PoolerTeam } from '../entities/pooler-team.entity';
import { PoolerTeamService } from '../services/pooler-team.service';

@Controller('pooler-teams')
export class PoolerTeamController {
  constructor(private poolerTeamService: PoolerTeamService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<PoolerTeam> {
    return this.poolerTeamService.getPoolerTeamById(id);
  }

  @Post()
  create(
    @Body() createPoolerTeamDto: CreatePoolerTeamDto,
  ): Promise<PoolerTeam> {
    return this.poolerTeamService.createPoolerTeam(createPoolerTeamDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePoolerTeamDto: UpdatePoolerTeamDto,
  ): Promise<PoolerTeam> {
    return this.poolerTeamService.updatePoolerTeam(id, updatePoolerTeamDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.poolerTeamService.deletePoolerTeam(id);
  }

  @Post(':id/players')
  addPlayers(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ParseArrayPipe({ items: CreatePlayerDto }))
    createPlayerDtos: CreatePlayerDto[],
  ) {
    return this.poolerTeamService.addPlayers(id, createPlayerDtos);
  }
}
