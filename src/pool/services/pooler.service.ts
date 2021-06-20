import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repos } from 'src/interfaces/repos.interface';
import { LeagueRepository } from 'src/league/repositories/league.repository';
import { CreatePoolerDto } from '../dto/create-pooler.dto';
import { UpdatePoolerDto } from '../dto/update-pooler.dto';
import { Pooler } from '../entities/pooler.entity';
import { PoolerRepository } from '../repositories/pooler.repository';

@Injectable()
export class PoolerService {
  constructor(
    @InjectRepository(PoolerRepository)
    private poolerRepository: PoolerRepository,
    private leagueRepository: LeagueRepository,
  ) {}

  private repos: Repos = {
    leagueRepository: this.leagueRepository,
  };
  async getPoolerById(id: string): Promise<Pooler> {
    const found = await this.poolerRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Pooler with ID ${id} not found`);
    }

    return found;
  }

  async createPooler(createPoolerDto: CreatePoolerDto): Promise<Pooler> {
    return this.poolerRepository.createPooler(createPoolerDto, this.repos);
  }

  async updatePooler(id: string, updatePoolerDto: UpdatePoolerDto) {
    const pooler = await this.getPoolerById(id);

    const { name, leagueId } = updatePoolerDto;

    if (leagueId) {
      pooler.league = await this.leagueRepository.findOne(leagueId);
    }

    pooler.name = name;

    await this.poolerRepository.save(pooler);

    return pooler;
  }

  async deletePooler(id: string): Promise<void> {
    const result = await this.poolerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Pooler with ID ${id} not found`);
    }
  }
}
