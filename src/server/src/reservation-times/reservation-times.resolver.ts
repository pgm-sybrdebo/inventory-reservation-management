import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationTimesService } from './reservation-times.service';
import { ReservationTime } from './entities/reservation-time.entity';
import { CreateReservationTimeInput } from './dto/create-reservation-time.input';
import { UpdateReservationTimeInput } from './dto/update-reservation-time.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => ReservationTime)
export class ReservationTimesResolver {
  constructor(
    private readonly reservationTimesService: ReservationTimesService,
  ) {}

  @Mutation(() => ReservationTime)
  createReservationTime(
    @Args('createReservationTimeInput')
    createReservationTimeInput: CreateReservationTimeInput,
  ) {
    return this.reservationTimesService.create(createReservationTimeInput);
  }

  @Query(() => [ReservationTime], { name: 'reservationTimes' })
  findAll() {
    return this.reservationTimesService.findAll();
  }

  @Query(() => ReservationTime, { name: 'reservationTime' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationTimesService.findOne(id);
  }

  @Mutation(() => ReservationTime)
  updateReservationTime(
    @Args('updateReservationTimeInput')
    updateReservationTimeInput: UpdateReservationTimeInput,
  ) {
    return this.reservationTimesService.update(
      updateReservationTimeInput.id,
      updateReservationTimeInput,
    );
  }

  @Mutation(() => ReservationTime)
  removeReservationTime(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationTimesService.remove(id);
  }
}
