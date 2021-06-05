import { EntityRepository, Repository } from 'typeorm';
import { Pooler } from '../entities/pooler.entity';

@EntityRepository(Pooler)
export class PoolerRepository extends Repository<Pooler> {}
