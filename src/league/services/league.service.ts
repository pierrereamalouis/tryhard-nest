import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeagueDto } from '../dto/create-league.dto';
import { UpdateLeagueDto } from '../dto/update-league.dto';
import { League } from '../entities/league.entity';
import { LeagueRepository } from '../repositories/league.repository';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(LeagueRepository)
    private leagueRepository: LeagueRepository,
  ) {}

  async getLeagueById(id: number): Promise<League> {
    const found = await this.leagueRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`League with ID ${id} not found`);
    }

    return found;
  }

  async createLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueRepository.createLeague(createLeagueDto);
  }

  async deleteLeague(id: number): Promise<void> {
    const result = await this.leagueRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`League with ID "${id}" not found`);
    }
  }

  async updateLeague(
    id: number,
    updateLeagueDto: UpdateLeagueDto,
  ): Promise<League> {
    const league = await this.getLeagueById(id);

    const { name } = updateLeagueDto;
    league.name = name;

    await this.leagueRepository.save(league);

    return league;
  }
}
