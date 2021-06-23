import { Repos } from 'src/interfaces/repos.interface';
import mapDtoToEntity from 'src/utils/entity.utils';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePoolerDto } from '../dto/create-pooler.dto';
import { Pooler } from '../entities/pooler.entity';

@EntityRepository(Pooler)
export class PoolerRepository extends Repository<Pooler> {
  async createPooler(
    createPoolerDto: CreatePoolerDto,
    repos: Repos,
  ): Promise<Pooler> {
    const { leagueId } = createPoolerDto;

    const pooler = mapDtoToEntity<Pooler, CreatePoolerDto>(
      new Pooler(),
      createPoolerDto,
    );

    await pooler.save();

    const league = await repos.leagueRepository.findOne(leagueId);
    league.poolers.push(pooler);
    await repos.leagueRepository.save(league);

    return pooler;
  }
}
