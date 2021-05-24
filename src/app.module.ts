import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LeagueModule],
})
export class AppModule {}
