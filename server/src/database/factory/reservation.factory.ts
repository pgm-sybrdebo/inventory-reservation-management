import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { Device } from 'src/devices/entities/device.entity';

define(Reservation, (faker: typeof Faker) => {
  const reservation = new Reservation();
  reservation.device_id = factory(Device)() as any;
  reservation.reservation_state_id = factory(ReservationState)() as any;
  reservation.user_id = factory(User)() as any;
  reservation.start_date = faker.date.recent();
  reservation.end_date = faker.date.soon();
  return reservation;
});
