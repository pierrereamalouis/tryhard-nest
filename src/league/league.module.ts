import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from './controllers/league.controller';
import { LeagueRepository } from './repositories/league.repository';
import { LeagueService } from './services/league.service';
import { SeasonController } from './controllers/season.controller';
import { SeasonService } from './services/season.service';
import { SeasonRepository } from './repositories/season.repository';
import { PoolModule } from 'src/pool/pool.module';
import { RulesRepository } from './repositories/rules.repository';
import { RulesService } from './services/rules.service';
import { RulesController } from './controllers/rules.controller';
import { PlayerRepository } from 'src/pool/repositories/player.repository';

@Module({
  imports: [
    PoolModule,
    TypeOrmModule.forFeature([
      LeagueRepository,
      SeasonRepository,
      RulesRepository,
      PlayerRepository,
    ]),
  ],
  controllers: [LeagueController, SeasonController, RulesController],
  providers: [LeagueService, SeasonService, RulesService],
})
export class LeagueModule {}
