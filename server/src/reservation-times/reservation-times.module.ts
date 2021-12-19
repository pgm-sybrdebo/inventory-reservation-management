import { Module } from '@nestjs/common';
import { ReservationTimesService } from './reservation-times.service';
import { ReservationTimesResolver } from './reservation-times.resolver';
import { ReservationTime } from './entities/reservation-time.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationTime])],
  providers: [ReservationTimesResolver, ReservationTimesService]
})
export class ReservationTimesModule {}
