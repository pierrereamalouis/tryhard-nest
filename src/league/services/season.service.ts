import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { SeasonRepository } from '../repositories/season.repository';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { Season } from '../entities/season.entity';
import { LeagueRepository } from '../repositories/league.repository';
import { RulesRepository } from '../repositories/rules.repository';
import mapDtoToEntity from '../../utils/entity.utils';
import { PlayerRepository } from 'src/pool/repositories/player.repository';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(SeasonRepository)
    private seasonRepository: SeasonRepository,
    private leagueRepository: LeagueRepository,
    private rulesRepository: RulesRepository,
    private playerRepository: PlayerRepository,
  ) {}

  private repos = {
    leagueRepository: this.leagueRepository,
    rulesRepository: this.rulesRepository,
    playerRepository: this.playerRepository,
  };

  async getSeasonById(id: number): Promise<Season> {
    try {
      return await this.seasonRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error, `Season with ID ${id} not found`);
    }
  }

  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    return this.seasonRepository.createSeason(createSeasonDto, this.repos);
  }

  async deleteSeason(id: number): Promise<void> {
    const result = await this.seasonRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
  }

  async updateSeason(
    id: number,
    updateSeasonDto: UpdateSeasonDto,
  ): Promise<Season> {
    const season = await this.getSeasonById(id);

    const { leagueId, rulesId } = updateSeasonDto;

    if (leagueId) {
      season.league = await this.leagueRepository.findOne(leagueId);
    }

    if (rulesId) {
      season.rules = await this.rulesRepository.findOne(rulesId);
    }

    const updatedSeason = mapDtoToEntity<Season, UpdateSeasonDto>(
      season,
      updateSeasonDto,
    );
    await this.seasonRepository.save(updatedSeason);

    return updatedSeason;
  }
}
