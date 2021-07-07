import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolerRepository } from 'src/pool/repositories/pooler.repository';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { Invitation } from '../entities/invitation.entity';
import { InvitationRepository } from '../repositories/invitation.repository';
import { LeagueRepository } from '../repositories/league.repository';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationRepository)
    private invitationRepository: InvitationRepository,
    private leagueRepository: LeagueRepository,
    private poolerRepository: PoolerRepository,
    private mailService: MailService,
  ) {}

  async findInvitation(invitationToken: string): Promise<Invitation> {
    const found = await this.invitationRepository.findOne({
      invitationToken,
    });

    if (!found) {
      throw new NotFoundException(
        `Invitation with token ${invitationToken} not found`,
      );
    }

    return found;
  }

  async joinTheLeague(invitationToken: string): Promise<void> {
    const invitation = await this.findInvitation(invitationToken);

    try {
      const pooler = await this.poolerRepository.findOneOrFail(
        {
          email: invitation.email,
        },
        { relations: ['leagues'] },
      );

      pooler.leagues.push(invitation.league);

      await this.poolerRepository.save(pooler);

      invitation.isUsed = true;

      await this.invitationRepository.save(invitation);
    } catch (error) {
      throw new NotFoundException(
        `Pooler Not found with email provided from the invitation dataset`,
      );
    }
  }

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<void> {
    const invitation = new Invitation();

    const { leagueId, poolerId } = createInvitationDto;

    invitation.invitationToken = uuidv4();

    invitation.league = await this.leagueRepository.findOne(leagueId);
    invitation.pooler = await this.poolerRepository.findOne(poolerId);

    invitation.email = invitation.pooler.email;
    await invitation.save();

    await this.mailService.sendPoolerInvitation(
      invitation.pooler,
      invitation.invitationToken,
    );
  }
}
