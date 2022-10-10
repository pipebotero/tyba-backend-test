import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Transaction } from './src/transactions/entities/transaction.entity';
import { Blacklist } from './src/blacklist/entities/blacklist.entity';
import { CreateUser1665346323134 } from './migrations/1665346323134-CreateUser';
import { CreateBlacklist1665358788110 } from './migrations/1665358788110-CreateBlacklist';
import { CreateTransaction1665369673947 } from './migrations/1665369673947-CreateTransaction';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User, Transaction, Blacklist],
  migrations: [
    CreateUser1665346323134,
    CreateBlacklist1665358788110,
    CreateTransaction1665369673947,
  ],
});
