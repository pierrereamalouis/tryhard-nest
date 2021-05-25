import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    LeagueModule,
  ],
})
export class AppModule {}
