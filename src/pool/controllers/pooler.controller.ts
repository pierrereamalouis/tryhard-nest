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
import { CreatePoolerDto } from '../dto/create-pooler.dto';
import { UpdatePoolerDto } from '../dto/update-pooler.dto';
import { Pooler } from '../entities/pooler.entity';
import { PoolerService } from '../services/pooler.service';

@Controller('poolers')
export class PoolerController {
  constructor(private poolerService: PoolerService) {}

  @Get(':id')
  getPoolerById(@Param('id', ParseIntPipe) id: string): Promise<Pooler> {
    return this.poolerService.getPoolerById(id);
  }

  @Post()
  createPooler(@Body() createPoolerDto: CreatePoolerDto): Promise<Pooler> {
    return this.poolerService.createPooler(createPoolerDto);
  }

  @Patch(':id')
  updatePooler(
    @Param('id') id: string,
    @Body() updatePoolerDto: UpdatePoolerDto,
  ): Promise<Pooler> {
    return this.poolerService.updatePooler(id, updatePoolerDto);
  }

  @Delete(':id')
  deletePooler(@Param('id') id: string): Promise<void> {
    return this.poolerService.deletePooler(id);
  }
}
