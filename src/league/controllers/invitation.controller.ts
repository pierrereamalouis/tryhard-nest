import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { InvitationService } from '../services/invitation.service';

@Controller('invitations')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  @Get(':invitation-token')
  joinLeague(
    @Param('invitation-token', ParseUUIDPipe) invitationToken: string,
  ): void {
    this.invitationService.joinTheLeague(invitationToken);
  }

  @Post()
  invitePoolerToLeague(@Body() createInvitationDto: CreateInvitationDto): void {
    this.invitationService.createInvitation(createInvitationDto);
  }
}
