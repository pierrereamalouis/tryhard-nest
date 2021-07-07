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
import { InvitationController } from './controllers/invitation.controller';
import { InvitationService } from './services/invitation.service';
import { InvitationRepository } from './repositories/invitation.repository';
import { PoolerRepository } from 'src/pool/repositories/pooler.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeagueRepository,
      SeasonRepository,
      RulesRepository,
      PlayerRepository,
      InvitationRepository,
      PoolerRepository,
    ]),
    PoolModule,
    MailModule,
  ],
  controllers: [
    LeagueController,
    SeasonController,
    RulesController,
    InvitationController,
  ],
  providers: [LeagueService, SeasonService, RulesService, InvitationService],
})
export class LeagueModule {}
