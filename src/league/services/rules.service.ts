import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { UpdateRulesDto } from '../dto/update-rules.dto';
import { Rules } from '../entities/rules.entity';
import { RulesRepository } from '../repositories/rules.repository';
import mapDtoToEntity from '../utils/entity.utils';

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

  async updateRules(
    id: string,
    updateRulesDto: UpdateRulesDto,
  ): Promise<Rules> {
    const rules = await this.getRulesById(id);

    const updatedRules = mapDtoToEntity<Rules, UpdateRulesDto>(
      rules,
      updateRulesDto,
    );
    await this.rulesRepository.save(updatedRules);

    return updatedRules;
  }

  async deleteRules(id: string): Promise<void> {
    const result = await this.rulesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Rules with ID ${id} not found`);
    }
  }
}
