import { define, factory } from "typeorm-seeding";
import * as Faker from 'faker';
import { ReservationState } from "src/reservation-states/entities/reservation-state.entity";

const reservationStates = ['reserved', 'taken', 'returned']

define(ReservationState, (faker: typeof Faker) => { 
  const reservationState = new ReservationState();
  reservationState.name = reservationStates[faker.datatype.number({min: 0, max:2})];
  return reservationState; 
});