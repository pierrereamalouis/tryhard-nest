import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from './controllers/league.controller';
import { LeagueRepository } from './repositories/league.repository';
import { LeagueService } from './services/league.service';
import { SeasonController } from './controllers/season.controller';
import { SeasonService } from './services/season.service';
import { SeasonRepository } from './repositories/season.repository';
import { Keepers } from 'src/pool/entities/keepers.entity';
import { PoolerTeam } from 'src/pool/entities/pooler-team.entity';
import { Pooler } from 'src/pool/entities/pooler.entity';
import { Player } from 'src/pool/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeagueRepository,
      SeasonRepository,
      Keepers,
      PoolerTeam,
      Pooler,
      Player,
    ]),
  ],
  controllers: [LeagueController, SeasonController],
  providers: [LeagueService, SeasonService],
})
export class LeagueModule {}
