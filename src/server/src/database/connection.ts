import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;

const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'frankfurt-postgres.render.com',
  port: 5432,
  username: 'aidsyb',
  password: 'K3W1heJnIprF5WFpzqeQSU6EEuMEQRjj',
  database: 'artevelde_inventory',
  // host: 'ec2-54-162-211-113.compute-1.amazonaws.com',
  // port: 5432,
  // username: 'spftdcheqzbjrb',
  // password: '2def93e13d0217714916d7ecc80d92ab2e1e9376a570b95253674362b41afcc2',
  // database: 'ddv7il8pg12ett',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: nodeEnvironment === 'development' ? true : false,
  dropSchema: nodeEnvironment === 'test' ? true : false,
  ssl: true,
  // ssl: { rejectUnauthorized: false }
};

// important to work with CLI
module.exports = {
  ...typeormConfig,
  seeds: [__dirname + '/../database/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/../database/**/*.factory{.ts,.js}'],
};
