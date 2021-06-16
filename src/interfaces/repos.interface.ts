import { SeasonRepository } from 'src/league/repositories/season.repository';
import { KeepersRepository } from 'src/pool/repositories/keepers.repository';
import { PlayerRepository } from 'src/pool/repositories/player.repository';
import { PoolerTeamRepository } from 'src/pool/repositories/pooler-team.repository';
import { PoolerRepository } from 'src/pool/repositories/pooler.repository';
import { LeagueRepository } from '../league/repositories/league.repository';
import { RulesRepository } from '../league/repositories/rules.repository';

export interface Repos {
  leagueRepository?: LeagueRepository;
  rulesRepository?: RulesRepository;
  seasonRepository?: SeasonRepository;
  poolerRepository?: PoolerRepository;
  poolerTeamRepository?: PoolerTeamRepository;
  keepersRepository?: KeepersRepository;
  playerRepository?: PlayerRepository;
}
