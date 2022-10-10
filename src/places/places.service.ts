import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { BlacklistService } from 'src/blacklist/blacklist.service';
@Injectable()
export class PlacesService extends Client {
  private readonly MAPS_API_KEY = this.config.get('GOOGLE_MAPS_API_KEY');
  constructor(
    private config: ConfigService,
    private blacklistService: BlacklistService,
  ) {
    super();
  }
  async findAll(query: any) {
    let location: any = null;
    if (query.location && query.location.includes(',')) {
      location = {
        lat: query.location.split(',')[0],
        lng: query.location.split(',')[1],
      };
    } else if (query.location) {
      location = query.location;
    }
    console.log({ location });
    return this.placesNearby({
      params: {
        location,
        radius: 1500,
        type: 'restaurant',
        client_id: '',
        client_secret: '',
        key: this.MAPS_API_KEY,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data.results);
          return response.data.results;
        }
      })
      .catch((error) => {
        // console.log(error);
        throw new HttpException('Not resutaurants found', HttpStatus.NOT_FOUND);
      });
  }

  public async findJwtInBlacklist(token: string) {
    console.log('findJwtInBlacklist');
    const tokenBL = await this.blacklistService.findOne(token);
    console.log({ tokenBL });
    if (tokenBL) {
      throw new HttpException('Token in blacklist', HttpStatus.UNAUTHORIZED);
    }
    return tokenBL;
  }
}
