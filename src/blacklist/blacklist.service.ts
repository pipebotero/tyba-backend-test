import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';
import { Blacklist } from './entities/blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private blacklistRepository: Repository<Blacklist>,
  ) {}

  async create(createBlacklistDto: CreateBlacklistDto) {
    const newTokenBL = await this.blacklistRepository.create(
      createBlacklistDto,
    );
    await this.blacklistRepository.save(newTokenBL);
    return newTokenBL;
  }

  findAll() {
    return `This action returns all blacklist`;
  }

  async findOne(token: string) {
    const tokenBL = await this.blacklistRepository.findOne({
      where: {
        token: token,
      },
    });
    if (tokenBL) {
      return tokenBL;
    }
    return null;
  }

  update(id: number, updateBlacklistDto: UpdateBlacklistDto) {
    return `This action updates a #${id} blacklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} blacklist`;
  }

  public async findJwtInBlacklist(token: string) {
    console.log('findJwtInBlacklist');
    const tokenBL = await this.findOne(token);
    console.log({ tokenBL });
    if (tokenBL) {
      throw new HttpException('Token in blacklist', HttpStatus.UNAUTHORIZED);
    }
    return tokenBL;
  }
}
