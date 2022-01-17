import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeviceStatusesService } from './device-statuses.service';
import { DeviceStatus } from './entities/device-status.entity';
import { CreateDeviceStatusInput } from './dto/create-device-status.input';
import { UpdateDeviceStatusInput } from './dto/update-device-status.input';
import { ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
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

  @Query(() => Int, { name: 'totalDeviceStatusesByName' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async totalDeviceStatusesByName(
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.deviceStatusesService.countWithName(name);
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

  @Query(() => [DeviceStatus], { name: 'deviceStatusesByNameWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.deviceStatusesService.findAllByNameWithPagination(name, offset, limit);
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

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async removeDeviceStatus(@Args('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.deviceStatusesService.remove(id);
      return true;
    } catch (error) {
      throw error
    }
    
  }

  @Mutation(() => DeviceStatus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveDeviceStatus(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.deviceStatusesService.softRemove(id);
  }
}
