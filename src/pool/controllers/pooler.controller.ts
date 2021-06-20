import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
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
  @UsePipes(ValidationPipe)
  createPooler(@Body() createPoolerDto: CreatePoolerDto): Promise<Pooler> {
    return this.poolerService.createPooler(createPoolerDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updatePooler(
    @Body('id') id: string,
    updatePoolerDto: UpdatePoolerDto,
  ): Promise<Pooler> {
    return this.poolerService.updatePooler(id, updatePoolerDto);
  }

  @Delete(':id')
  deletePooler(@Param('id') id: string): Promise<void> {
    return this.poolerService.deletePooler(id);
  }
}
