import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { Season } from '../entities/season.entity';

@EntityRepository(Season)
export class SeasonRepository extends Repository<Season> {
  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    const { year, draftDay, keepersDeadline, tradeDeadline, league } =
      createSeasonDto;

    const season = new Season();
    season.year = year;
    season.draftDay = draftDay;
    season.keepersDeadline = keepersDeadline;
    season.tradeDeadline = tradeDeadline;
    season.league = league;

    await season.save();

    return season;
  }
}
