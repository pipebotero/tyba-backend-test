import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { ConfigModule } from '@nestjs/config';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [ConfigModule, BlacklistModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
