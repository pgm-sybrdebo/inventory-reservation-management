import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Mutation(() => Device)
  createDevice(@Args('createDeviceInput') createDeviceInput: CreateDeviceInput) {
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

  @Mutation(() => Device)
  updateDevice(@Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput) {
    return this.devicesService.update(updateDeviceInput.id, updateDeviceInput);
  }

  @Mutation(() => Device)
  removeDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.remove(id);
  }
}
