import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeviceStatusesService } from './device-statuses.service';
import { DeviceStatus } from './entities/device-status.entity';
import { CreateDeviceStatusInput } from './dto/create-device-status.input';
import { UpdateDeviceStatusInput } from './dto/update-device-status.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => DeviceStatus)
export class DeviceStatusesResolver {
  constructor(private readonly deviceStatusesService: DeviceStatusesService) {}

  @Mutation(() => DeviceStatus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createDeviceStatus(
    @Args('createDeviceStatusInput')
    createDeviceStatusInput: CreateDeviceStatusInput,
  ) {
    return this.deviceStatusesService.create(createDeviceStatusInput);
  }

  @Query(() => [DeviceStatus], { name: 'deviceStatuses' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.deviceStatusesService.findAll();
  }

  @Query(() => DeviceStatus, { name: 'deviceStatus' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.findOne(id);
  }

  @Mutation(() => DeviceStatus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  removeDeviceStatus(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.remove(id);
  }

  @Mutation(() => DeviceStatus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveDeviceStatus(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.softRemove(id);
  }
}
