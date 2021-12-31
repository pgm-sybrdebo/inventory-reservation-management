import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Model } from 'src/models/entities/model.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.devicesService.create(createDeviceInput);
  }

  @Query(() => [Device], { name: 'devices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.devicesService.findAll();
  }

  @Query(() => Device, { name: 'device' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOne(id);
  }

  @Query(() => Device, { name: 'getDeviceById' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findOneByDeviceId(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOneByDeviceId(id);
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.devicesService.update(updateDeviceInput.id, updateDeviceInput);
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.remove(id);
  }

  @ResolveField((returns) => [Reservation])
  reservations(@Parent() device: Device): Promise<Reservation[]> {
    return this.devicesService.getDeviceReservations(device.id);
  }

  @ResolveField((returns) => DeviceStatus)
  deviceStatus(@Parent() device: Device): Promise<DeviceStatus> {
    return this.devicesService.getDeviceStatusByDeviceStatusId(
      device.deviceStatusId,
    );
  }

  @ResolveField((returns) => Model)
  model(@Parent() device: Device): Promise<Model> {
    return this.devicesService.getModelByDeviceId(device.modelId);
  }
}
