import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceStatusInput } from './dto/create-device-status.input';
import { UpdateDeviceStatusInput } from './dto/update-device-status.input';
import { DeviceStatus } from './entities/device-status.entity';

@Injectable()
export class DeviceStatusesService {
  constructor(
    @InjectRepository(DeviceStatus)
    private deviceStatusesRepository: Repository<DeviceStatus>,
  ) {}

  create(
    createDeviceStatusInput: CreateDeviceStatusInput,
  ): Promise<DeviceStatus> {
    const newDeviceStatus = this.deviceStatusesRepository.create(
      createDeviceStatusInput,
    );

    return this.deviceStatusesRepository.save(newDeviceStatus);
  }

  findAll(): Promise<DeviceStatus[]> {
    return this.deviceStatusesRepository.find();
  }

  findOne(id: string): Promise<DeviceStatus> {
    return this.deviceStatusesRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateDeviceStatusInput: UpdateDeviceStatusInput,
  ): Promise<DeviceStatus> {
    const updatedDeviceStatus = await this.deviceStatusesRepository.preload({
      id: id,
      ...updateDeviceStatusInput,
    });

    return this.deviceStatusesRepository.save(updatedDeviceStatus);
  }

  async remove(id: string): Promise<DeviceStatus> {
    const deviceStatus = await this.findOne(id);
    return this.deviceStatusesRepository.remove(deviceStatus);
  }
}
