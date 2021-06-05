import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from 'src/league/entities/league.entity';
import { Season } from 'src/league/entities/season.entity';
import { KeepersRepository } from './repositories/keepers.repository';
import { PlayerRepository } from './repositories/player.repository';
import { PoolerTeamRepository } from './repositories/pooler-team.repository';
import { PoolerRepository } from './repositories/pooler.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PoolerRepository,
      PoolerTeamRepository,
      KeepersRepository,
      PlayerRepository,
      League,
      Season,
    ]),
  ],
})
export class PoolModule {}
