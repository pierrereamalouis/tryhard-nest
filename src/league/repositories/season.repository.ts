import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { Season } from '../entities/season.entity';
import { leagueRules } from '../interfaces/leagueRules.interface';
import mapDtoToEntity from '../utils/entity.utils';
@EntityRepository(Season)
export class SeasonRepository extends Repository<Season> {
  async createSeason(
    createSeasonDto: CreateSeasonDto,
    repos: leagueRules,
  ): Promise<Season> {
    const { leagueId, rulesId } = createSeasonDto;

    const season = mapDtoToEntity<Season, CreateSeasonDto>(
      new Season(),
      createSeasonDto,
    );

    season.league = await repos.leagueRepository.findOne(leagueId);
    season.rules = await repos.rulesRepository.findOne(rulesId);

    await season.save();

    return season;
  }
}
