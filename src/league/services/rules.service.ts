import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { Rules } from '../entities/rules.entity';
import { RulesRepository } from '../repositories/rules.repository';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(RulesRepository)
    private rulesRepository: RulesRepository,
  ) {}

  async getRulesById(id: string): Promise<Rules> {
    const found = await this.rulesRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Rules with ID ${id} not found`);
    }

    return found;
  }

  async createRules(createRulesDto: CreateRulesDto): Promise<Rules> {
    return this.rulesRepository.createRules(createRulesDto);
  }
}
