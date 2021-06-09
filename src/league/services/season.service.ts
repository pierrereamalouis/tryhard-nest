import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { SeasonRepository } from '../repositories/season.repository';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { Season } from '../entities/season.entity';
import { LeagueRepository } from '../repositories/league.repository';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(SeasonRepository)
    private seasonRepository: SeasonRepository,
    private leagueRepository: LeagueRepository,
  ) {}

  async getSeasonById(id: string): Promise<Season> {
    const found = await this.seasonRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Season with ID ${id} no found`);
    }

    return found;
  }

  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    return this.seasonRepository.createSeason(
      createSeasonDto,
      this.leagueRepository,
    );
  }

  async deleteSeason(id: string): Promise<void> {
    const result = await this.seasonRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Season with ID ${id} no found`);
    }
  }

  async updateSeason(
    id: string,
    updateSeasonDto: UpdateSeasonDto,
  ): Promise<Season> {
    const season = await this.getSeasonById(id);

    // update fields only with not null value
    for (let key in updateSeasonDto) {
      if (updateSeasonDto[key] !== null && updateSeasonDto[key] !== '') {
        season[key] = updateSeasonDto[key];
      }
    }

    await this.seasonRepository.save(season);

    return season;
  }
}
