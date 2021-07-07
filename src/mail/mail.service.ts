import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Pooler } from 'src/pool/entities/pooler.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPoolerInvitation(pooler: Pooler, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: pooler.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'league-invitation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: pooler.name,
        url,
      },
    });
  }
}
