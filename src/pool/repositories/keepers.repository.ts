import { EntityRepository, Repository } from 'typeorm';
import { Keepers } from '../entities/keepers.entity';

@EntityRepository(Keepers)
export class KeepersRepository extends Repository<Keepers> {}
