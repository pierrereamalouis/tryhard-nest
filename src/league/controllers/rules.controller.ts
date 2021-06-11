import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRulesDto } from '../dto/create-rules.dto';
import { UpdateRulesDto } from '../dto/update-rules.dto';
import { Rules } from '../entities/rules.entity';
import { RulesService } from '../services/rules.service';

@Controller('rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @Get(':id')
  getRulesById(@Param('id', ParseIntPipe) id: string): Promise<Rules> {
    return this.rulesService.getRulesById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRules(@Body() createRulesDto: CreateRulesDto): Promise<Rules> {
    return this.rulesService.createRules(createRulesDto);
  }

  @Patch(':id')
  updateRules(
    @Param('id') id: string,
    @Body() updateRulesDto: UpdateRulesDto,
  ): Promise<Rules> {
    return this.rulesService.updateRules(id, updateRulesDto);
  }
}
