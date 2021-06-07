import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { Season } from '../entities/season.entity';
import { LeagueRepository } from './league.repository';

@EntityRepository(Season)
export class SeasonRepository extends Repository<Season> {
  constructor(
    @InjectRepository(LeagueRepository)
    private leagueRepository: LeagueRepository,
  ) {
    super();
  }

  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    const { year, draftDay, keepersDeadline, tradeDeadline, leagueId } =
      createSeasonDto;

    const season = new Season();
    season.year = year;
    season.draftDay = new Date(draftDay);
    season.keepersDeadline = new Date(keepersDeadline);
    season.tradeDeadline = new Date(tradeDeadline);

    season.league = await this.leagueRepository.findOne(leagueId);

    await season.save();

    return season;
  }
}
