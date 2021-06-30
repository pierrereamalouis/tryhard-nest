import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repos } from 'src/interfaces/repos.interface';
import { SeasonRepository } from 'src/league/repositories/season.repository';
import mapDtoToEntity from 'src/utils/entity.utils';
import { CreateKeepersDto } from '../dto/create-keepers.dto';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdateKeepersDto } from '../dto/update-keepers.dto';
import { Keepers } from '../entities/keepers.entity';
import { Player } from '../entities/player.entity';
import { KeepersRepository } from '../repositories/keepers.repository';
import { PlayerRepository } from '../repositories/player.repository';
import { PoolerRepository } from '../repositories/pooler.repository';

@Injectable()
export class KeepersService {
  constructor(
    @InjectRepository(KeepersRepository)
    private keepersRepository: KeepersRepository,
    private poolerRepository: PoolerRepository,
    private seasonRepository: SeasonRepository,
    private playerRepository: PlayerRepository,
  ) {}

  private repos: Repos = {
    poolerRepository: this.poolerRepository,
    seasonRepository: this.seasonRepository,
  };

  async getKeepersbyId(id: number): Promise<Keepers> {
    const found = await this.keepersRepository.findOne(id, {
      relations: ['players'],
    });

    if (!found) {
      throw new NotFoundException(`Keepers with ID ${id} not found`);
    }

    return found;
  }

  async createKeepers(createKeepersDto: CreateKeepersDto): Promise<Keepers> {
    return this.keepersRepository.createKeepers(createKeepersDto, this.repos);
  }

  async updateKeepers(
    id: number,
    updateKeepersDto: UpdateKeepersDto,
  ): Promise<Keepers> {
    const keepers = await this.getKeepersbyId(id);

    const { seasonId, poolerId } = updateKeepersDto;

    if (seasonId) {
      keepers.season = await this.seasonRepository.findOne(seasonId);
    }

    if (poolerId) {
      keepers.pooler = await this.poolerRepository.findOne(poolerId);
    }

    const updatedKeepers = mapDtoToEntity<Keepers, UpdateKeepersDto>(
      keepers,
      updateKeepersDto,
    );

    await this.keepersRepository.save(updatedKeepers);

    return updatedKeepers;
  }

  async deleteKeepers(id: number): Promise<void> {
    const result = await this.keepersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Keepers List with Id ${id} not found`);
    }
  }

  async addPlayers(
    id: number,
    createPlayerDtos: CreatePlayerDto[],
  ): Promise<Keepers> {
    const keepers = await this.getKeepersbyId(id);

    keepers.players = await this.playerRepository.getPlayersArray(
      createPlayerDtos,
    );

    await this.keepersRepository.save(keepers);

    return keepers;
  }

  async addOnePlayer(
    id: number,
    createPlayerDto: CreatePlayerDto,
  ): Promise<Keepers> {
    const keepers = await this.getKeepersbyId(id);

    const player = await this.playerRepository.createNewPlayer(createPlayerDto);

    keepers.players.push(player);

    await this.keepersRepository.save(keepers);

    return keepers;
  }
}
