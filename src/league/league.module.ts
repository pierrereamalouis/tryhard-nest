import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from './controllers/league.controller';
import { LeagueRepository } from './repositories/league.repository';
import { LeagueService } from './services/league.service';
import { SeasonController } from './controllers/season.controller';
import { SeasonService } from './services/season.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueRepository])],
  controllers: [LeagueController, SeasonController],
  providers: [LeagueService, SeasonService],
})
export class LeagueModule {}
