import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeepersRepository } from './repositories/keepers.repository';
import { PlayerRepository } from './repositories/player.repository';
import { PoolerTeamRepository } from './repositories/pooler-team.repository';
import { PoolerRepository } from './repositories/pooler.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PoolerRepository,
      KeepersRepository,
      PoolerTeamRepository,
      PlayerRepository,
    ]),
  ],
})
export class PoolModule {}
