import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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

  async countWithName(name: string): Promise<number> {
    const rawData = await this.deviceStatusesRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "device_status"
    WHERE "deleted_on" IS NULL
    AND LOWER("name") LIKE LOWER('${name}%')
    `);
    return rawData[0].total;
  }

  findAll(): Promise<DeviceStatus[]> {
    return this.deviceStatusesRepository.find();
  }

  findAllByNameWithPagination(name: string, offset: number, limit: number): Promise<DeviceStatus[]> {
    return this.deviceStatusesRepository.find({
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '${name}%'`)
      },
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
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

  async softRemove(id: string): Promise<DeviceStatus> {
    const deviceStatus = await this.findOne(id);
    return this.deviceStatusesRepository.softRemove(deviceStatus);
  }
}
