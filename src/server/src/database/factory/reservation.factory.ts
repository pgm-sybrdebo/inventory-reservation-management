import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { Device } from 'src/devices/entities/device.entity';

interface Context {
  id: string, 
  reservation_states: ReservationState[]
}

define(Reservation, (faker: typeof Faker, context: Context) => {
  const { id, reservation_states } = context;
  // 25% chance for no endDate
  const boolean = Math.random() < 0.25;
  const startDate = faker.date.between("2021-01-01", "2022-04-01")
  let newDate = faker.date.between("2021-01-01", "2022-04-30");
  while (new Date(newDate) < new Date(startDate)) {
    newDate = faker.date.between("2021-01-01", "2022-04-30");
  }
  const endDate = boolean ? null : newDate; 

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
  reservation.userId = factory(User)() as any;
  reservation.start_date = startDate;
  reservation.end_date = endDate;
  return reservation; 
});
