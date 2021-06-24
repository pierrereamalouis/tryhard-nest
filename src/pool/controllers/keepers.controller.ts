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
import { CreateKeepersDto } from '../dto/create-keepers.dto';
import { UpdateKeepersDto } from '../dto/update-keepers.dto';
import { Keepers } from '../entities/keepers.entity';
import { KeepersService } from '../services/keepers.service';

@Controller('keepers')
export class KeepersController {
  constructor(private keepersService: KeepersService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: string): Promise<Keepers> {
    return this.keepersService.getKeepersbyId(id);
  }

  @Post()
  create(@Body() createKeepersDto: CreateKeepersDto): Promise<Keepers> {
    return this.keepersService.createKeepers(createKeepersDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeepersDto: UpdateKeepersDto,
  ): Promise<Keepers> {
    return this.keepersService.updateKeepers(id, updateKeepersDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.keepersService.deleteKeepers(id);
  }
}
