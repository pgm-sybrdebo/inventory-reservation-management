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
import { User } from 'src/users/entities/user.entity';
import { Damage } from 'src/damages/entities/damage.entity';

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

  @Query(() => [Device], { name: 'borrowedDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllBorrowedDevices() {
    return this.devicesService.findAllBorrowedDevices();
  }

  @Query(() => [Device], { name: 'stockDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllStockDevices() {
    return this.devicesService.findAllStockDevices();
  }
  @Query(() => [Device], { name: 'inCheckDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllInCheckDevices() {
    return this.devicesService.findAllInCheckDevices();
  }

  @Query(() => [Device], { name: 'recentNewDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findRecentNewDevices() {
    return this.devicesService.findRecentNewDevices();
  }

  @Query(() => Int, { name: 'totalDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findTotal() {
    return this.devicesService.findAndCount();
  }

  @Query(() => Int, { name: 'differenceLastMonthDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findDifferenceLastMonth() {
    return this.devicesService.findDifferenceLastMonth();
  }

  @Query(() => [Device], { name: 'recentDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findRecentDevices(@Args('from', { type: () => String }) from: string, @Args('to', { type: () => String }) to: string) {
    return this.devicesService.findRecentDevices(from, to);
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

<<<<<<< HEAD
  @Query(() => Device, { name: 'getDevicesByModelId' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findAllByModelId(@Args('modelId', new ParseUUIDPipe()) modelId: string) {
    return this.devicesService.findAllByModelId(modelId);
  }

=======
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
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

<<<<<<< HEAD
  @ResolveField(returns => [Damage])
  damages(@Parent() device: Device): Promise<Damage[]> {
    return this.devicesService.getDeviceDamages(device.id);
  }

  @ResolveField(returns => DeviceStatus)
=======
  @ResolveField((returns) => DeviceStatus)
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
  deviceStatus(@Parent() device: Device): Promise<DeviceStatus> {
    return this.devicesService.getDeviceStatusByDeviceStatusId(
      device.deviceStatusId,
    );
  }

<<<<<<< HEAD
  @ResolveField(returns => User)
  user(@Parent() device: Device): Promise<User> {
    if (device.userId){
      return this.devicesService.getUserByUserId(device.userId);
    } else {
      return;
    }
  }

  @ResolveField(returns => Model)
=======
  @ResolveField((returns) => Model)
>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2
  model(@Parent() device: Device): Promise<Model> {
    return this.devicesService.getModelByDeviceId(device.modelId);
  }
}
