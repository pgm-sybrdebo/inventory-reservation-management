import { Module, forwardRef } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { DevicesModule } from 'src/devices/devices.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),  
    forwardRef(() => DevicesModule),
    forwardRef(() => UsersModule),
  ],
  providers: [ReservationsResolver, ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}
