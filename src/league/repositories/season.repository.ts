import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { Season } from '../entities/season.entity';
import { leagueRules } from '../interfaces/leagueRules.interface';
@EntityRepository(Season)
export class SeasonRepository extends Repository<Season> {
  async createSeason(
    createSeasonDto: CreateSeasonDto,
    repos: leagueRules,
  ): Promise<Season> {
    const {
      year,
      draftDay,
      keepersDeadline,
      tradeDeadline,
      leagueId,
      rulesId,
    } = createSeasonDto;

    const season = new Season();
    season.year = year;
    season.draftDay = new Date(draftDay);
    season.keepersDeadline = new Date(keepersDeadline);
    season.tradeDeadline = new Date(tradeDeadline);

    season.league = await repos.leagueRepository.findOne(leagueId);
    season.rules = await repos.rulesRepository.findOne(rulesId);

    await season.save();

    return season;
  }
}
