import { EntityRepository, Repository } from 'typeorm';
import { PoolerTeam } from '../entities/pooler-team.entity';

@EntityRepository(PoolerTeam)
export class PoolerTeamRepository extends Repository<PoolerTeam> {}
