import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { UpdateRulesDto } from '../dto/update-rules.dto';
import { Rules } from '../entities/rules.entity';
import { RulesService } from '../services/rules.service';

@Controller('rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @Get(':id')
  getRulesById(@Param('id', ParseIntPipe) id: number): Promise<Rules> {
    return this.rulesService.getRulesById(id);
  }

  @Post()
  createRules(@Body() createRulesDto: CreateRulesDto): Promise<Rules> {
    return this.rulesService.createRules(createRulesDto);
  }

  @Patch(':id')
  updateRules(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRulesDto: UpdateRulesDto,
  ): Promise<Rules> {
    return this.rulesService.updateRules(id, updateRulesDto);
  }

  @Delete(':id')
  deleteRules(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.rulesService.deleteRules(id);
  }
}
