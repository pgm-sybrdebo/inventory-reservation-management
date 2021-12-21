import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeviceStatusesService } from './device-statuses.service';
import { DeviceStatus } from './entities/device-status.entity';
import { CreateDeviceStatusInput } from './dto/create-device-status.input';
import { UpdateDeviceStatusInput } from './dto/update-device-status.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => DeviceStatus)
export class DeviceStatusesResolver {
  constructor(private readonly deviceStatusesService: DeviceStatusesService) {}

  @Mutation(() => DeviceStatus)
  createDeviceStatus(
    @Args('createDeviceStatusInput')
    createDeviceStatusInput: CreateDeviceStatusInput,
  ) {
    return this.deviceStatusesService.create(createDeviceStatusInput);
  }

  @Query(() => [DeviceStatus], { name: 'deviceStatuses' })
  findAll() {
    return this.deviceStatusesService.findAll();
  }

  @Query(() => DeviceStatus, { name: 'deviceStatus' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.findOne(id);
  }

  @Mutation(() => DeviceStatus)
  updateDeviceStatus(
    @Args('updateDeviceStatusInput')
    updateDeviceStatusInput: UpdateDeviceStatusInput,
  ) {
    return this.deviceStatusesService.update(
      updateDeviceStatusInput.id,
      updateDeviceStatusInput,
    );
  }

  @Mutation(() => DeviceStatus)
  removeDeviceStatus(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.remove(id);
  }
}
