import { EntityRepository, Repository } from 'typeorm';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { Rules } from '../entities/rules.entity';
import mapEntityKeys from '../utils/entity.utils';

@EntityRepository(Rules)
export class RulesRepository extends Repository<Rules> {
  async createRules(createRulesDto: CreateRulesDto): Promise<Rules> {
    const rules = new Rules();

    // for (let key in createRulesDto) {
    //   rules[key] = createRulesDto[key];
    // }

    const createdRules = mapEntityKeys<Rules, CreateRulesDto>(rules, createRulesDto);
    console.log(createdRules);
    await createdRules.save();
    
    

    return createdRules;
  }
}
