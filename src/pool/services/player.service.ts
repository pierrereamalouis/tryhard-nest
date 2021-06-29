import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Observable } from 'rxjs';
import { Repos } from 'src/interfaces/repos.interface';
import { SeasonRepository } from 'src/league/repositories/season.repository';
import mapDtoToEntity from 'src/utils/entity.utils';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player } from '../entities/player.entity';
import { PlayerRepository } from '../repositories/player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    private seasonRepository: SeasonRepository,
    private httpService: HttpService,
  ) {}

  private repos: Repos = {
    seasonRepository: this.seasonRepository,
  };

  async getPlayerById(id: number): Promise<Player> {
    const found = await this.playerRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return found;
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = mapDtoToEntity<Player, CreatePlayerDto>(
      new Player(),
      createPlayerDto,
    );

    await player.save();

    return player;
  }

  async updatePlayer(
    id: number,
    udpatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const player = await this.getPlayerById(id);

    const updatedPlayer = mapDtoToEntity<Player, UpdatePlayerDto>(
      player,
      udpatePlayerDto,
    );

    await this.playerRepository.save(player);

    return updatedPlayer;
  }

  async deletePlayer(id: number): Promise<void> {
    const result = await this.playerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Player with Id ${id} not found`);
    }
  }

  async getPlayersFromMySportsFeeds(): Promise<any> {
    const response = await this.httpService
      .get('players.json?rosterstatus=assigned-to-roster&limit=10')
      .toPromise();

    return await this.setNhlTeam(response.data);
  }

  async setNhlTeam(data) {
    data.players = data.players.filter(
      (players) => players.player.currentTeam !== null,
    );

    data.players.forEach((players) => {
      players.player['nhlTeam'] = players.player['currentTeam'];

      players.player.nhlTeam = players.player.nhlTeam.abbreviation;

      delete players.player['currentTeam'];
    });

    return data;
  }
}
