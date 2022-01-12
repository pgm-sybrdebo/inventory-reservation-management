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
import {
  Optional,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
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
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.devicesService.create(createDeviceInput);
  }

  @Query(() => [Device], { name: 'devices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.devicesService.findAll();
  }

  @Query(() => [Device], { name: 'devicesWithPagination' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllWithPagination(
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.devicesService.findAllPagination(offset, limit);
  }

  @Query(() => [Device], { name: 'borrowedDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllBorrowedDevices() {
    return this.devicesService.findAllBorrowedDevices();
  }

  @Query(() => [Device], { name: 'stockDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllStockDevices() {
    return this.devicesService.findAllStockDevices();
  }
  @Query(() => [Device], { name: 'inCheckDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllInCheckDevices() {
    return this.devicesService.findAllInCheckDevices();
  }

  @Query(() => [Device], { name: 'recentNewDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findRecentNewDevices() {
    return this.devicesService.findRecentNewDevices();
  }

  @Query(() => Int, { name: 'totalDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findTotal() {
    return this.devicesService.findAndCount();
  }

  // @Query(() => Int, { name: 'totalReadyDevices' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  // async findTotalReady() {
  //   return this.devicesService.findAndCountReadyDevices();
  // }

  @Query(() => Int, { name: 'differenceLastMonthDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findDifferenceLastMonth() {
    return this.devicesService.findDifferenceLastMonth();
  }

  @Query(() => [Device], { name: 'recentDevices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findRecentDevices(
    @Args('from', { type: () => String }) from: string,
    @Args('to', { type: () => String }) to: string,
  ) {
    return this.devicesService.findRecentDevices(from, to);
  }

  @Query(() => Device, { name: 'device' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOne(id);
  }

  @Query(() => Device, { name: 'getDeviceById' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findOneByDeviceId(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.findOneByDeviceId(id);
  }

  @Query(() => Device, { name: 'getDevicesByModelId' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAllByModelId(@Args('modelId', new ParseUUIDPipe()) modelId: string) {
    return this.devicesService.findAllByModelId(modelId);
  }

  @Query(() => Device, { name: 'getDevicesByModelIdWithPagination' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAllByModelIdWithPagination(
    @Args('modelId', new ParseUUIDPipe()) modelId: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.devicesService.findAllByModelIdWithPagination(
      modelId,
      offset,
      limit,
    );
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.devicesService.update(updateDeviceInput.id, updateDeviceInput);
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  removeDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.remove(id);
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.devicesService.softRemove(id);
  }

  @ResolveField((returns) => [Reservation])
  reservations(@Parent() device: Device): Promise<Reservation[]> {
    return this.devicesService.getDeviceReservations(device.id);
  }

  @ResolveField((returns) => [Damage])
  damages(@Parent() device: Device): Promise<Damage[]> {
    return this.devicesService.getDeviceDamages(device.id);
  }

  @ResolveField((returns) => DeviceStatus)
  deviceStatus(@Parent() device: Device): Promise<DeviceStatus> {
    return this.devicesService.getDeviceStatusByDeviceStatusId(
      device.deviceStatusId,
    );
  }

  @ResolveField((returns) => User)
  user(@Parent() device: Device): Promise<User> {
    if (device.userId) {
      return this.devicesService.getUserByUserId(device.userId);
    } else {
      return;
    }
  }

  @ResolveField((returns) => Model)
  model(@Parent() device: Device): Promise<Model> {
    return this.devicesService.getModelByDeviceId(device.modelId);
  }
}
