import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { ReservationTime } from 'src/reservation-times/entities/reservation-time.entity';

define(ReservationTime, (faker: typeof Faker) => {
  const reservationTime = new ReservationTime();
  reservationTime.amount = faker.datatype.datetime();
  reservationTime.name = faker.lorem.word();
  return reservationTime;
});
