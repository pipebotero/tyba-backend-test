import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { Blacklist } from './entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  controllers: [BlacklistController],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
