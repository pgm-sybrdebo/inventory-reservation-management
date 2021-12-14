import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  createReservation(@Args('createReservationInput') createReservationInput: CreateReservationInput) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation)
  updateReservation(@Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.remove(id);
  }
}
