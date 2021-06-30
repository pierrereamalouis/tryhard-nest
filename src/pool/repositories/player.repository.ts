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
}
