import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesResolver } from './devices.resolver';
import { Device } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesResolver, DevicesService]
})
export class DevicesModule {}
