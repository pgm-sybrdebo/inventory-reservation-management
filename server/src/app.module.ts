import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationStatesModule } from './reservation-states/reservation-states.module';
import { ReservationTimesModule } from './reservation-times/reservation-times.module';
import { DamagesModule } from './damages/damages.module';
import { DevicesModule } from './devices/devices.module';

import * as dotenv from 'dotenv';
dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${nodeEnvironment}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        seeds: [__dirname + '**/*.seed{.ts,.js}'],
        factories: [__dirname + '**/*.factory{.ts,.js}'],
        synchronize: true,
        logging: nodeEnvironment === 'development' ? true : false,
        dropSchema: nodeEnvironment === 'test' ? true : false,
        // ssl: true,
      }),
    }),
    UsersModule,
    ReservationsModule,
    ReservationStatesModule,
    ReservationTimesModule,
    DamagesModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
