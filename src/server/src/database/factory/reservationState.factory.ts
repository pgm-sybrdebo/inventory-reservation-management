import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';

const reservationStates = ['reserved', 'taken', 'returned'];
let number = 0;

define(ReservationState, (faker: typeof Faker) => {
  const reservationState = new ReservationState();
  reservationState.name = reservationStates[number];
  number++;
  return reservationState;
});
