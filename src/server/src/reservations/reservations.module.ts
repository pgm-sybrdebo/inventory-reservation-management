import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsResolver, ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}
