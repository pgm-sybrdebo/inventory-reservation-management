import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceStatusesService } from 'src/device-statuses/device-statuses.service';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Model } from 'src/models/entities/model.entity';
import { ModelsService } from 'src/models/models.service';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Repository } from 'typeorm';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
    private reservationsService: ReservationsService,
    private deviceStatusesService: DeviceStatusesService,
    @Inject(forwardRef(() => ModelsService)) private modelsService: ModelsService,
  ) {}

  create(createDeviceInput: CreateDeviceInput): Promise<Device> {
    const newDevice = this.devicesRepository.create(createDeviceInput);

    return this.devicesRepository.save(newDevice);
  }

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  findAllByModelId(modelId: string): Promise<Device[]> {
    return this.devicesRepository.find({modelId: modelId, deviceStatusId: "5e36852b-f18a-441b-a44e-8348ec0ca322"});
  }

  findOne(id: string): Promise<Device> {
    return this.devicesRepository.findOneOrFail(id);
  }

  findOneByDeviceId(id: string): Promise<Device> {
    return this.devicesRepository.findOne({id: id, deviceStatusId: "5e36852b-f18a-441b-a44e-8348ec0ca322"});
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

  getDeviceReservations(deviceId: string): Promise<Reservation[]> {
    return this.reservationsService.findAllByDeviceId(deviceId);
  }

  getDeviceStatusByDeviceStatusId(deviceStatusId: string): Promise<DeviceStatus> {
    return this.deviceStatusesService.findOne(deviceStatusId);
  }

  getModelByDeviceId(modelId: string): Promise<Model> {
    return this.modelsService.findOne(modelId);
  }
}
