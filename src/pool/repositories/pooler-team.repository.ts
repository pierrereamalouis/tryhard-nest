import { Repos } from 'src/interfaces/repos.interface';
import mapDtoToEntity from 'src/utils/entity.utils';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePoolerTeamDto } from '../dto/create-pooler-team.dto';
import { PoolerTeam } from '../entities/pooler-team.entity';

@EntityRepository(PoolerTeam)
export class PoolerTeamRepository extends Repository<PoolerTeam> {
  async createPoolerTeam(
    createPoolerTeamDto: CreatePoolerTeamDto,
    repos: Repos,
  ): Promise<PoolerTeam> {
    const { seasonId, poolerId } = createPoolerTeamDto;

    const poolerTeam = mapDtoToEntity<PoolerTeam, CreatePoolerTeamDto>(
      new PoolerTeam(),
      createPoolerTeamDto,
    );

    poolerTeam.season = await repos.seasonRepository.findOne(seasonId);
    poolerTeam.pooler = await repos.playerRepository.findOne(poolerId);

    await poolerTeam.save();

    return poolerTeam;
  }
}
