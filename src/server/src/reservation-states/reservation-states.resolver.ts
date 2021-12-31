import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationStatesService } from './reservation-states.service';
import { ReservationState } from './entities/reservation-state.entity';
import { CreateReservationStateInput } from './dto/create-reservation-state.input';
import { UpdateReservationStateInput } from './dto/update-reservation-state.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => ReservationState)
export class ReservationStatesResolver {
  constructor(
    private readonly reservationStatesService: ReservationStatesService,
  ) {}

  @Mutation(() => ReservationState)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createReservationState(
    @Args('createReservationStateInput')
    createReservationStateInput: CreateReservationStateInput,
  ) {
    return this.reservationStatesService.create(createReservationStateInput);
  }

  @Query(() => [ReservationState], { name: 'reservationStates' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.reservationStatesService.findAll();
  }

  @Query(() => ReservationState, { name: 'reservationState' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationStatesService.findOne(id);
  }

  @Mutation(() => ReservationState)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateReservationState(
    @Args('updateReservationStateInput')
    updateReservationStateInput: UpdateReservationStateInput,
  ) {
    return this.reservationStatesService.update(
      updateReservationStateInput.id,
      updateReservationStateInput,
    );
  }

  @Mutation(() => ReservationState)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeReservationState(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.reservationStatesService.remove(id);
  }
}
