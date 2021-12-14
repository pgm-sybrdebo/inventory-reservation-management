import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationStatesService } from './reservation-states.service';
import { ReservationState } from './entities/reservation-state.entity';
import { CreateReservationStateInput } from './dto/create-reservation-state.input';
import { UpdateReservationStateInput } from './dto/update-reservation-state.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => ReservationState)
export class ReservationStatesResolver {
  constructor(private readonly reservationStatesService: ReservationStatesService) {}

  @Mutation(() => ReservationState)
  createReservationState(@Args('createReservationStateInput') createReservationStateInput: CreateReservationStateInput) {
    return this.reservationStatesService.create(createReservationStateInput);
  }

  @Query(() => [ReservationState], { name: 'reservationStates' })
  findAll() {
    return this.reservationStatesService.findAll();
  }

  @Query(() => ReservationState, { name: 'reservationState' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationStatesService.findOne(id);
  }

  @Mutation(() => ReservationState)
  updateReservationState(@Args('updateReservationStateInput') updateReservationStateInput: UpdateReservationStateInput) {
    return this.reservationStatesService.update(updateReservationStateInput.id, updateReservationStateInput);
  }

  @Mutation(() => ReservationState)
  removeReservationState(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationStatesService.remove(id);
  }
}
