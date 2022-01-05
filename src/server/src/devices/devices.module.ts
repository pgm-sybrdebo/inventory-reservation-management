import { forwardRef, Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesResolver } from './devices.resolver';
import { Device } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { DeviceStatusesModule } from 'src/device-statuses/device-statuses.module';
import { ModelsModule } from 'src/models/models.module';
import { UsersModule } from 'src/users/users.module';
import { DamagesModule } from 'src/damages/damages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device]),
    // ReservationsModule,
    forwardRef(() => ReservationsModule),
    DeviceStatusesModule,
    // UsersModule,
    DamagesModule,
    forwardRef(() => ModelsModule),
    forwardRef(() => UsersModule),
    // ModelsModule,
  ],
  providers: [DevicesResolver, DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
