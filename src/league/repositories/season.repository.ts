import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { Season } from '../entities/season.entity';
import { leagueRules } from '../interfaces/leagueRules.interface';
import mapEntityKeys from '../utils/entity.utils';
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

    // not looping through createSeasonDto because it doesn't quite match Season Entity properties (leagueId and rulesId)
    const season = new Season();
    // season.year = year;
    // season.draftDay = new Date(draftDay);
    // season.keepersDeadline = new Date(keepersDeadline);
    // season.tradeDeadline = new Date(tradeDeadline);

    season.league = await repos.leagueRepository.findOne(leagueId);
    season.rules = await repos.rulesRepository.findOne(rulesId);

    const createdSeason = mapEntityKeys<Season, CreateSeasonDto>(season, createSeasonDto);


    await createdSeason.save();

    return createdSeason;
  }
}
