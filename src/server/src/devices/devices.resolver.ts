import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Model } from 'src/models/entities/model.entity';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Mutation(() => Device)
  createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.devicesService.create(createDeviceInput);
  }

  @Query(() => [Device], { name: 'devices' })
  findAll() {
    return this.devicesService.findAll();
  }

  @Query(() => Device, { name: 'device' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOne(id);
  }

  @Query(() => Device, { name: 'getDeviceById' })
  findOneByDeviceId(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOneByDeviceId(id);
  }



  @Mutation(() => Device)
  updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.devicesService.update(updateDeviceInput.id, updateDeviceInput);
  }

  @Mutation(() => Device)
  removeDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.remove(id);
  }

  @ResolveField(returns => [Reservation])
  reservations(@Parent() device: Device): Promise<Reservation[]> {
    return this.devicesService.getDeviceReservations(device.id);
  }

  @ResolveField(returns => DeviceStatus)
  deviceStatus(@Parent() device: Device): Promise<DeviceStatus> {
    return this.devicesService.getDeviceStatusByDeviceStatusId(device.deviceStatusId);
  }

  @ResolveField(returns => Model)
  model(@Parent() device: Device): Promise<Model> {
    return this.devicesService.getModelByDeviceId(device.modelId);
  }
  
}
