import { EntityRepository, Repository } from 'typeorm';
import { CreateLeagueDto } from '../dto/create-league.dto';
import { League } from '../entities/league.entity';

@EntityRepository(League)
export class LeagueRepository extends Repository<League> {
  async createLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    const { name } = createLeagueDto;

    const league = new League();
    league.name = name;

    league.save();

    return league;
  }
}
