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
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: nodeEnvironment === 'development' ? true : false,
  dropSchema: nodeEnvironment === 'test' ? true : false,
  ssl: true,
};

// important to work with CLI
module.exports = {
  ...typeormConfig,
  seeds: [__dirname + '/../database/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/../database/**/*.factory{.ts,.js}'],
};
