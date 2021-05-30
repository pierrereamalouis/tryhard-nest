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
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { Season } from '../entities/season.entity';
import { SeasonService } from '../services/season.service';

@Controller('seasons')
export class SeasonController {
  constructor(private seasonService: SeasonService) {}

  @Get(':id')
  getSeasonById(@Param('id', ParseIntPipe) id: string): Promise<Season> {
    return this.seasonService.getSeasonById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<Season> {
    return this.seasonService.createSeason(createSeasonDto);
  }

  @Delete(':id')
  deleteSeason(@Param('id') id: string): Promise<void> {
    return this.seasonService.deleteSeason(id);
  }

  @Patch(':id')
  updateSeason(
    @Param('id') id: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ): Promise<Season> {
    return this.seasonService.updateSeason(id, updateSeasonDto);
  }
}
