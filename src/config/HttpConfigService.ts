import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private configService: ConfigService) {}
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: 'https://api.mysportsfeeds.com/v2.1/pull/nhl/',
      auth: {
        username: this.configService.get<string>('MYSPORTSFEEDSUSERNAME'),
        password: this.configService.get<string>('MYSPORTSFEEDSPASSWORD'),
      },
    };
  }
}
