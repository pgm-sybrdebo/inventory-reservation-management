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
import { Total } from 'src/models/dto/total';
import { ModelsService } from 'src/models/models.service';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly modelsService: ModelsService
    ) {}

  @Mutation(() => Device)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    const createdDevice = await this.devicesService.create(createDeviceInput);
    const updatedReadyQuantityModel = await this.modelsService.recalculateReadyQuantity(createdDevice.modelId);
    const updatedQuantityModel = await this.modelsService.recalculateQuantity(createdDevice.modelId);

    return createdDevice;
  }


  @Query(() => Int, { name: 'totalDevicesByName' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async totalDevicesByName(
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.devicesService.countWithName(name);
  }

  @Query(() => [Device], { name: 'devices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.devicesService.findAll();
  }

  @Query(() => [Device], { name: 'devicesByNameWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.devicesService.findAllByNameWithPagination(name, offset, limit);
  }

  @Query(() => [Device], { name: 'devicesWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
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


  @Query(() => [Total], { name: 'totalDevicesByModelId' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async GetTotalDevicesByModelId(
    @Args('modelId', new ParseUUIDPipe()) modelId: string
  ) {
    return this.devicesService.getTotalDevicesByModelId(modelId);
  }

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

  @Query(() => [Device], { name: 'getDevicesByModelId' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAllByModelId(@Args('modelId', new ParseUUIDPipe()) modelId: string) {
    return this.devicesService.findAllByModelId(modelId);
  }

  @Query(() => [Device], { name: 'getDevicesByModelIdWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
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
  async updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    const updatedDevice = await this.devicesService.update(updateDeviceInput.id, updateDeviceInput);
    console.log("update", updatedDevice.modelId);
    const updatedQuantityModel = await this.modelsService.recalculateReadyQuantity(updatedDevice.modelId);
    return updatedDevice;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async removeDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    try {
      const deletedDevice = await this.devicesService.findOne(id);
      const updatedReadyQuantityModel = await this.modelsService.recalculateReadyQuantity(deletedDevice.modelId);
      const updatedQuantityModel = await this.modelsService.recalculateQuantity(deletedDevice.modelId);
      await this.devicesService.remove(id);
      return true;
    } catch(error) {
      console.error(error);
    }
  }

  @Mutation(() => Device)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async softRemoveDevice(@Args('id', new ParseUUIDPipe()) id: string) {
    const deletedDevice = await this.devicesService.findOne(id);
    const updatedReadyQuantityModel = await this.modelsService.recalculateReadyQuantity(deletedDevice.modelId);
    const updatedQuantityModel = await this.modelsService.recalculateQuantity(deletedDevice.modelId);
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
