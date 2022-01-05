import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { Device } from 'src/devices/entities/device.entity';

interface Context {
  id: string;
  reservation_states: ReservationState[];
  userId?: string;
  number: number;
}

define(Reservation, (faker: typeof Faker, context: Context) => {
  const { id, reservation_states, userId } = context;
  console.log("reservation User", userId)

  // 25% chance for no endDate
  // const boolean = Math.random() < 0.25;
  const startDate = userId ? faker.date.between('2021-10-01', '2022-01-01') : faker.date.between('2021-01-01', '2022-04-01');
  let newDate = userId ? faker.date.between('2021-10-01', '2022-01-01') : faker.date.between('2021-01-01', '2022-04-30');
  while (new Date(newDate) < new Date(startDate)) {
    newDate = userId ? faker.date.between('2021-10-01', '2022-01-01') : faker.date.between('2021-01-01', '2022-04-30');
  }
  const endDate = userId || new Date() < startDate  ? null : newDate;

  let reserv_state;
  // start date in future = reserved
  if (new Date() < startDate) {
    reserv_state = 0;
    // end date in the past = returned
  } else if (new Date() > endDate && endDate !== null) {
    reserv_state = 2;
  } else {
    reserv_state = 1;
  }

  const reservation = new Reservation();
  reservation.deviceId = id;
  reservation.reservationState = reservation_states[reserv_state];
  reservation.userId = userId ? userId : factory(User)() as any;
  reservation.start_date = startDate;
  reservation.end_date = endDate;
  reservation.expected_end_date = newDate;
  return reservation;
});
