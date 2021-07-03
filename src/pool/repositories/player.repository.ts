import { Season } from 'src/league/entities/season.entity';
import mapDtoToEntity from 'src/utils/entity.utils';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player } from '../entities/player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async createNewPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = mapDtoToEntity<Player, CreatePlayerDto>(
      new Player(),
      createPlayerDto,
    );

    await player.save();

    return player;
  }

  async updatePlayer(
    player: Player,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const updatedPlayer = mapDtoToEntity<Player, UpdatePlayerDto>(
      player,
      updatePlayerDto,
    );

    await this.save(updatedPlayer);

    return updatedPlayer;
  }

  async createPlayersArray(playerDto: CreatePlayerDto): Promise<Player> {
    const existingPlayer = await this.findOne({
      mySportsFeedsId: playerDto.mySportsFeedsId,
    });

    if (!existingPlayer) {
      const player = mapDtoToEntity<Player, CreatePlayerDto>(
        new Player(),
        playerDto,
      );
      await player.save();
      return player;
    }

    return existingPlayer;
  }

  async getPlayersArray(
    createPlayerDtos: CreatePlayerDto[],
  ): Promise<Player[]> {
    return await Promise.all(
      createPlayerDtos.map(this.createPlayersArray, this),
    );
  }

  async getSeasonPlayersFA(id: number): Promise<never[]> {
    const playersFA: never[] = await this.createQueryBuilder()
      .select('player.my_sports_feeds_id')
      .from(Season, 'season')
      .innerJoin(
        'pooler_team',
        'pooler_team',
        'season.id = pooler_team.season_id',
      )
      .innerJoin(
        'pooler_team_players',
        'pooler_team_players',
        'pooler_team.id = pooler_team_players.pooler_team_id',
      )
      .innerJoin(
        'player',
        'player',
        'pooler_team_players.player_id = player.id ',
      )
      .where('season.id = :id', { id: id })
      .printSql()
      .getRawMany();

    return playersFA;
  }
}
