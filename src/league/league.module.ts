import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from './controllers/league.controller';
import { LeagueRepository } from './repositories/league.repository';
import { LeagueService } from './services/league.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueRepository])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
