import { Module } from '@nestjs/common';
import { ReservationStatesService } from './reservation-states.service';
import { ReservationStatesResolver } from './reservation-states.resolver';
import { ReservationState } from './entities/reservation-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationState])],
  providers: [ReservationStatesResolver, ReservationStatesService]
})
export class ReservationStatesModule {}
