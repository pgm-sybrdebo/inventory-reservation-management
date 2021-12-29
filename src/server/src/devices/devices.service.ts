import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
  ) {}

  create(createDeviceInput: CreateDeviceInput): Promise<Device> {
    const newDevice = this.devicesRepository.create(createDeviceInput);

    return this.devicesRepository.save(newDevice);
  }

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  findOne(id: string): Promise<Device> {
    return this.devicesRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateDeviceInput: UpdateDeviceInput,
  ): Promise<Device> {
    const updatedDevice = await this.devicesRepository.preload({
      id: id,
      ...updateDeviceInput,
    });

    return this.devicesRepository.save(updatedDevice);
  }

  async remove(id: string): Promise<Device> {
    const device = await this.findOne(id);
    return this.devicesRepository.remove(device);
  }
}
