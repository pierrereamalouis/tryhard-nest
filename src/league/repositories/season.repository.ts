import { EntityRepository, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { League } from '../entities/league.entity';
import { Season } from '../entities/season.entity';

@EntityRepository(Season)
export class SeasonRepository extends Repository<Season> {
  async createSeason(createSeasonDto: CreateSeasonDto): Promise<Season> {
    const {
      year,
      draftDay,
      keepersDeadline,
      tradeDeadline,
      keepers,
      poolerTeams,
    } = createSeasonDto;

    const season = new Season();
    season.year = year;
    season.draftDay = draftDay;
    season.keepersDeadline = keepersDeadline;
    season.tradeDeadline = tradeDeadline;
    season.keepers = keepers;
    season.poolerTeams = poolerTeams;

    await season.save();

    return season;
  }
}
