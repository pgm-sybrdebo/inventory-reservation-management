import { Module } from '@nestjs/common';
import { DeviceStatusesService } from './device-statuses.service';
import { DeviceStatusesResolver } from './device-statuses.resolver';
import { DeviceStatus } from './entities/device-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceStatus])],
  providers: [DeviceStatusesResolver, DeviceStatusesService]
})
export class DeviceStatusesModule {}
