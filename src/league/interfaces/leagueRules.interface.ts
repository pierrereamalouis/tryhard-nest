import { LeagueRepository } from '../repositories/league.repository';
import { RulesRepository } from '../repositories/rules.repository';

export interface leagueRules {
  leagueRepository: LeagueRepository;
  rulesRepository: RulesRepository;
}
