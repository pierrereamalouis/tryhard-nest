import { Season } from 'src/league/entities/season.entity';
import mapDtoToEntity from 'src/utils/entity.utils';
import { EntityRepository, getConnection, Repository } from 'typeorm';
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

  async getSeasonPlayersFA(seasonId: number, responseData: any): Promise<any> {
    const playersIDs = await this.getPlayersFromSeason(seasonId);

    // data is result of axios call to mySportsFeeds api
    // filter players array so that we only returned players that has not been
    // taken
    // turn playersIDs into keys from an object
    // filter the array by checking if my_sports_feeds_id corresponds to one of the keys in obj
    // if yes remove player from the response.data.players array

    responseData.players = await this.filterPlayersArr(
      playersIDs,
      responseData.players,
    );

    return responseData;
  }

  async filterPlayersArr(playersIds: any[], players: any[]): Promise<any[]> {
    const obj = {};

    playersIds.forEach((value) => (obj[value] = 'player'));

    return players.filter((players) => !obj.hasOwnProperty(players.player.id));
  }

  async getPlayersFromSeason(id: number): Promise<never[]> {
    // Query to only get mySportsFeeds ids
    const players: never[] = await getConnection()
      .createQueryBuilder()
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
      .where('season.id = :id', { id })
      .getRawMany();

    return players.map((value) => value['my_sports_feeds_id']);
  }
}
