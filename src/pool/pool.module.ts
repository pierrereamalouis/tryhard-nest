import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeepersRepository } from './repositories/keepers.repository';
import { PlayerRepository } from './repositories/player.repository';
import { PoolerTeamRepository } from './repositories/pooler-team.repository';
import { PoolerRepository } from './repositories/pooler.repository';
import { PoolerController } from './controllers/pooler.controller';
import { PoolerTeamController } from './controllers/pooler-team.controller';
import { KeepersController } from './controllers/keepers.controller';
import { PlayerController } from './controllers/player.controller';
import { PoolerService } from './services/pooler.service';
import { PoolerTeamService } from './services/pooler-team.service';
import { KeepersService } from './services/keepers.service';
import { PlayerService } from './services/player.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PoolerRepository,
      KeepersRepository,
      PoolerTeamRepository,
      PlayerRepository,
    ]),
  ],
  controllers: [PoolerController, PoolerTeamController, KeepersController, PlayerController],
  providers: [PoolerService, PoolerTeamService, KeepersService, PlayerService],
})
export class PoolModule {}
