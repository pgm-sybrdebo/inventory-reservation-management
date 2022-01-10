import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DamagesService } from 'src/damages/damages.service';
import { Damage } from 'src/damages/entities/damage.entity';
import { DeviceStatusesService } from 'src/device-statuses/device-statuses.service';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Model } from 'src/models/entities/model.entity';
import { ModelsService } from 'src/models/models.service';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import {
  Repository,
  Between,
  LessThanOrEqual,
  Not,
  Equal,
  IsNull,
} from 'typeorm';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
    // private reservationsService: ReservationsService,
    private deviceStatusesService: DeviceStatusesService,
    // private usersService: UsersService,
    private damagesService: DamagesService,
    @Inject(forwardRef(() => ModelsService))
    private modelsService: ModelsService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => ReservationsService))
    private reservationsService: ReservationsService,
  ) {}

  create(createDeviceInput: CreateDeviceInput): Promise<Device> {
    const newDevice = this.devicesRepository.create(createDeviceInput);

    return this.devicesRepository.save(newDevice);
  }

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  findAllBorrowedDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      userId: Not(IsNull()),
    });
  }

  findAllStockDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      userId: IsNull(),
    });
  }

  findAllInCheckDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      deviceStatusId: 'ec2ed711-e4a3-42f6-b441-0e91f98f31ba',
    });
  }

  findRecentNewDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      order: {
        created_on: 'DESC',
      },
      take: 5,
    });
  }

  findAndCount(): Promise<number> {
    return this.devicesRepository.count();
  }

  async findDifferenceLastMonth(): Promise<number> {
    const date = new Date();
    const iso = date.toISOString();
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const previousIso = previousMonth.toISOString();
    const totalUsersLastMonth = await this.devicesRepository.count({
      created_on: LessThanOrEqual(previousIso),
    });
    const totalUsersNow = await this.devicesRepository.count();
    const difference = totalUsersNow - totalUsersLastMonth;
    return difference;
  }

  findRecentDevices(from: string, to: string): Promise<Device[]> {
    const date = new Date(Number(from));
    const iso = date.toISOString();
    const date1 = new Date(Number(to));
    const iso1 = date1.toISOString();
    return this.devicesRepository.find({
      created_on: Between(iso, iso1),
    });
  }

  findAllByModelId(modelId: string): Promise<Device[]> {
    return this.devicesRepository.find({
      modelId: modelId,
      deviceStatusId: '7b4a3256-6005-402b-916b-810f4d6669c8',
    });
  }

  findOne(id: string): Promise<Device> {
    return this.devicesRepository.findOneOrFail(id);
  }

  findOneByDeviceId(id: string): Promise<Device> {
    return this.devicesRepository.findOne({
      id: id,
      deviceStatusId: '7b4a3256-6005-402b-916b-810f4d6669c8',
    });
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

  async softRemove(id: string): Promise<Device> {
    const device = await this.findOne(id);
    return this.devicesRepository.softRemove(device);
  }

  getDeviceReservations(deviceId: string): Promise<Reservation[]> {
    return this.reservationsService.findAllByDeviceId(deviceId);
  }

  getDeviceDamages(deviceId: string): Promise<Damage[]> {
    return this.damagesService.findAllByDeviceId(deviceId);
  }

  getDeviceStatusByDeviceStatusId(
    deviceStatusId: string,
  ): Promise<DeviceStatus> {
    return this.deviceStatusesService.findOne(deviceStatusId);
  }

  getUserByUserId(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  getModelByDeviceId(modelId: string): Promise<Model> {
    return this.modelsService.findOne(modelId);
  }
}
