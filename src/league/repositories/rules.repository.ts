import { EntityRepository, Repository } from 'typeorm';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { Rules } from '../entities/rules.entity';

@EntityRepository(Rules)
export class RulesRepository extends Repository<Rules> {
  async createRules(createRulesDto: CreateRulesDto): Promise<Rules> {
    const rules = new Rules();

    for (let key in createRulesDto) {
      rules[key] = createRulesDto[key];
    }

    await rules.save();

    return rules;
  }
}
