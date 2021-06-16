import { Repos } from 'src/interfaces/repos.interface';
import mapDtoToEntity from 'src/utils/entity.utils';
import { EntityRepository, Repository } from 'typeorm';
import { CreateKeepersDto } from '../dto/create-keepers.dto';
import { Keepers } from '../entities/keepers.entity';

@EntityRepository(Keepers)
export class KeepersRepository extends Repository<Keepers> {
  async createKeepers(
    createKeepersDto: CreateKeepersDto,
    repos: Repos,
  ): Promise<Keepers> {
    const { seasonId, poolerId } = createKeepersDto;

    const keepers = mapDtoToEntity<Keepers, CreateKeepersDto>(
      new Keepers(),
      createKeepersDto,
    );

    keepers.season = await repos.seasonRepository.findOne(seasonId);
    keepers.pooler = await repos.poolerRepository.findOne(poolerId);

    await keepers.save();

    return keepers;
  }
}
