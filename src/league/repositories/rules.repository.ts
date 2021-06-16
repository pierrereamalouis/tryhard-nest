import { EntityRepository, Repository } from 'typeorm';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { Rules } from '../entities/rules.entity';
import mapDtoToEntity from '../../utils/entity.utils';

@EntityRepository(Rules)
export class RulesRepository extends Repository<Rules> {
  async createRules(createRulesDto: CreateRulesDto): Promise<Rules> {
    const rules = new Rules();

    console.log(Object.keys(rules));

    const createdRules = mapDtoToEntity<Rules, CreateRulesDto>(
      rules,
      createRulesDto,
    );
    await createdRules.save();

    return createdRules;
  }
}
