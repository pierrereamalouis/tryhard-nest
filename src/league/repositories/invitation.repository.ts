import { EntityRepository, Repository } from 'typeorm';
import { Invitation } from '../entities/invitation.entity';

@EntityRepository(Invitation)
export class InvitationRepository extends Repository<Invitation> {}
