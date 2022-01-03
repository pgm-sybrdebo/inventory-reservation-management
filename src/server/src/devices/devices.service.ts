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
import { Repository, Between, LessThanOrEqual, Not, Equal, IsNull } from 'typeorm';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
    // private reservationsService: ReservationsService,
    private deviceStatusesService: DeviceStatusesService,
<<<<<<< HEAD
    // private usersService: UsersService,
    private damagesService: DamagesService,
    @Inject(forwardRef(() => ModelsService)) private modelsService: ModelsService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => ReservationsService)) private reservationsService: ReservationsService,
=======
    @Inject(forwardRef(() => ModelsService))
    private modelsService: ModelsService,
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
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
      userId: Not(IsNull())
    });
  }

  findAllStockDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      userId: IsNull()
    });
  }

  findAllInCheckDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      deviceStatusId: "f2b5ac3c-de05-4ae2-b9ef-3d3b1d86fd91"
    });
  }

  findRecentNewDevices(): Promise<Device[]> {
    return this.devicesRepository.find({
      order: {
        created_on: "DESC"
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
      created_on: LessThanOrEqual(previousIso)
    })
    const totalUsersNow = await this.devicesRepository.count();
    const difference = totalUsersNow - totalUsersLastMonth;
    return difference;
  }

  findRecentDevices(from: string, to:string): Promise<Device[]> {
    const date = new Date(Number(from));
    const iso = date.toISOString();
    const date1 = new Date(Number(to));
    const iso1 = date1.toISOString();
    console.log(date);
    console.log(date1);
    console.log(iso);
    console.log(iso1)

    return this.devicesRepository.find({
      created_on: Between(iso
        , iso1),
    })
  }

  findAllByModelId(modelId: string): Promise<Device[]> {
<<<<<<< HEAD
    return this.devicesRepository.find({modelId: modelId, deviceStatusId: "15c5dbc7-766a-4dcc-a942-9bae3cddd179"});
=======
    return this.devicesRepository.find({
      modelId: modelId,
      deviceStatusId: '5e36852b-f18a-441b-a44e-8348ec0ca322',
    });
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
  }

  findOne(id: string): Promise<Device> {
    return this.devicesRepository.findOneOrFail(id);
 
  }

  findOneByDeviceId(id: string): Promise<Device> {
<<<<<<< HEAD
    return this.devicesRepository.findOne({id: id, deviceStatusId: "15c5dbc7-766a-4dcc-a942-9bae3cddd179"});
=======
    return this.devicesRepository.findOne({
      id: id,
      deviceStatusId: '5e36852b-f18a-441b-a44e-8348ec0ca322',
    });
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
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

<<<<<<< HEAD
  getDeviceDamages(deviceId: string): Promise<Damage[]> {
    return this.damagesService.findAllByDeviceId(deviceId);
  }

  getDeviceStatusByDeviceStatusId(deviceStatusId: string): Promise<DeviceStatus> {
=======
  getDeviceStatusByDeviceStatusId(
    deviceStatusId: string,
  ): Promise<DeviceStatus> {
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
    return this.deviceStatusesService.findOne(deviceStatusId);
  }

  getUserByUserId(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  getModelByDeviceId(modelId: string): Promise<Model> {
    return this.modelsService.findOne(modelId);
  }
}
