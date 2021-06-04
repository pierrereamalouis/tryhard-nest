import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { SeasonRepository } from '../repositories/season.repository';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { Season } from '../entities/season.entity';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(SeasonRepository)
    private seasonRepository: SeasonRepository,
  ) {}

  async getSeasonById(id: string): Promise<Season> {
    const found = await this.seasonRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Season with ID ${id} no found`);
    }

    return found;
  }

  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    return this.seasonRepository.createSeason(createSeasonDto);
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

    return season;
  }
}
