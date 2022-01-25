import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { ReservationsOverview } from './dto/reservationsOverview';
import { Device } from 'src/devices/entities/device.entity';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => [Reservation], {
    name: 'reservationsByUserIdAndReservationState',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllByUserIdAndReservationState(
    @Args('userId', new ParseUUIDPipe()) userId: string,
    @Args('reservationStateId', new ParseUUIDPipe()) reservationStateId: string,
  ) {
    return this.reservationsService.findAllByUSerIdAndReservationState(
      userId,
      reservationStateId,
    );
  }

  @Query(() => [Reservation], { name: 'recentReservations' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findRecentReservations() {
    return this.reservationsService.findRecentReservations();
  }

  @Query(() => [ReservationsOverview], { name: 'reservationsOverview' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  reservationsOverview(@Args('today', { type: () => String }) today: string) {
    return this.reservationsService.reservationsOverview(today);
  }

  @Query(() => Int, { name: 'totalMonthReservations' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findTotalMonthReservations(
    @Args('month', { type: () => String }) month: string,
  ) {
    return this.reservationsService.findTotalMonthReservations(month);
  }

  @Query(() => Reservation, { name: 'reservation' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(
      updateReservationInput.id,
      updateReservationInput,
    );
  }

  @Mutation(() => Reservation, { name: 'takenConfirmed' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  takenConfirmed(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.updateTakenConfirmed(
      updateReservationInput.id,
      updateReservationInput,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  async removeReservation(@Args('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.reservationsService.remove(id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Reservation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  softRemoveReservation(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.softRemove(id);
  }

  @ResolveField((returns) => Device)
  device(@Parent() reservation: Reservation): Promise<Device> {
    return this.reservationsService.getReservationByDeviceId(
      reservation.deviceId,
    );
  }

  @ResolveField((returns) => User)
  user(@Parent() reservation: Reservation): Promise<User> {
    return this.reservationsService.getReservationByUserId(reservation.userId);
  }
}
