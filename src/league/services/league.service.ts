import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeagueDto } from '../dto/create-league.dto';
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
      throw new NotFoundException(`League with ID ${id} no found`);
    }

    return found;
  }

  async createLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueRepository.createLeague(createLeagueDto);
  }
}
