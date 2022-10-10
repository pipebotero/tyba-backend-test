import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BlacklistService } from 'src/blacklist/blacklist.service';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
    private blacklistService: BlacklistService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: Request) {
    const token = request.headers.authorization.split(' ')[1];
    const tokenBL = await this.blacklistService.findJwtInBlacklist(token);
    const query = request.query;
    return this.placesService.findAll(query);
  }
}
