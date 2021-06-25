import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repos } from 'src/interfaces/repos.interface';
import { SeasonRepository } from 'src/league/repositories/season.repository';
import mapDtoToEntity from 'src/utils/entity.utils';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { CreatePoolerTeamDto } from '../dto/create-pooler-team.dto';
import { UpdatePoolerTeamDto } from '../dto/update-pooler-team.dto';
import { Player } from '../entities/player.entity';
import { PoolerTeam } from '../entities/pooler-team.entity';
import { PoolerTeamRepository } from '../repositories/pooler-team.repository';
import { PoolerRepository } from '../repositories/pooler.repository';

@Injectable()
export class PoolerTeamService {
  constructor(
    @InjectRepository(PoolerTeamRepository)
    private poolerTeamRepository: PoolerTeamRepository,
    private poolerRepository: PoolerRepository,
    private seasonRepository: SeasonRepository,
  ) {}

  private repos: Repos = {
    poolerRepository: this.poolerRepository,
    seasonRepository: this.seasonRepository,
  };

  async getPoolerTeamById(id: number): Promise<PoolerTeam> {
    const found = await this.poolerTeamRepository.findOne(id, {
      relations: ['players'],
    });

    if (!found) {
      throw new NotFoundException(`PoolerTeam with ID ${id} not found`);
    }

    return found;
  }

  async createPoolerTeam(
    createPoolerTeamDto: CreatePoolerTeamDto,
  ): Promise<PoolerTeam> {
    return this.poolerTeamRepository.createPoolerTeam(
      createPoolerTeamDto,
      this.repos,
    );
  }

  async updatePoolerTeam(
    id: number,
    updatePoolerTeamDto: UpdatePoolerTeamDto,
  ): Promise<PoolerTeam> {
    const poolerTeam = await this.getPoolerTeamById(id);

    const { seasonId, poolerId } = updatePoolerTeamDto;

    if (seasonId) {
      poolerTeam.season = await this.seasonRepository.findOne(seasonId);
    }

    if (poolerId) {
      poolerTeam.pooler = await this.poolerRepository.findOne(poolerId);
    }
    const updatedPoolerTeam = mapDtoToEntity<PoolerTeam, UpdatePoolerTeamDto>(
      poolerTeam,
      updatePoolerTeamDto,
    );

    await this.poolerTeamRepository.save(updatedPoolerTeam);

    return updatedPoolerTeam;
  }

  async deletePoolerTeam(id: number): Promise<void> {
    const result = await this.poolerTeamRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`PoolerTeam with Id ${id} not found`);
    }
  }

  async addPlayers(
    id: number,
    createPlayerDtos: CreatePlayerDto[],
  ): Promise<PoolerTeam> {
    const poolerTeam = await this.getPoolerTeamById(id);

    const players: Player[] = createPlayerDtos.map((playerDto) => {
      const player = mapDtoToEntity<Player, CreatePlayerDto>(
        new Player(),
        playerDto,
      );
      player.save();
      return player;
    });

    players.forEach((player) => {
      poolerTeam.players.push(player);
    });

    await this.poolerTeamRepository.save(poolerTeam);

    return poolerTeam;
  }
}
